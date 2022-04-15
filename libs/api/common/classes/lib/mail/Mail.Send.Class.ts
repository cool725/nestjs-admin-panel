/**
 * Send Email
 *
 * @Libaries:
 * Node Mailer
 *
 */
import * as nodemailer from 'nodemailer';
import { cryptoUtils } from 'libs/api/common/utils/api.utils.crypto';

const fs = require('fs');

/**Custom Plain Authentication Helper*/
const PLAIN = async (ctx) => {
  let cmd = await ctx.sendCommand(
    'AUTH PLAIN ' +
      Buffer.from(
        '\u0000' +
          ctx.auth.credentials.user +
          '\u0000' +
          ctx.auth.credentials.pass,
        'utf-8'
      ).toString('base64')
  );

  if (cmd.status < 200 || cmd.status >= 300) {
    throw new Error('Failed to authenticate user: ' + cmd.text);
  }
};

interface NodeMailerMailServerConfig {
  name?: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    hash?: string;
    user: string;
    pass: string;
  };
  customAuth?: any;
}

export namespace Mailer {
  class MailConfig implements NodeMailerMailServerConfig {
    name?: string;
    host: string;
    port: number;
    secure: boolean = false;
    auth = {
      hash: null,
      user: '',
      pass: '',
    };
    customAuth = {
      PLAIN: (ctx) => PLAIN(ctx),
    };

    constructor(data: NodeMailerMailServerConfig = null) {
      if (data) this.initialiseConfig(data);
    }

    initialiseConfig(data) {
      for (let k in data) this[k] = data[k];
      if (+this.auth.hash == 1) {
        this.auth.pass = cryptoUtils.decrypt(
          this.auth.pass,
          this.auth.user + process.env.APP_NAME
        );
      }

      if (this.host.includes('gmail')) {
        if (!this.name) {
          console.warn('For Gmail provide serverName');
        }
      }
    }

    export() {
      let auth = { ...this.auth };
      delete auth.hash;
      return {
        name: this.name,
        host: this.host,
        port: this.port,
        secure: this.secure,
        auth: auth,
        customAuth: {
          PLAIN: (ctx) => PLAIN(ctx),
        },
        // https://stackoverflow.com/questions/56147491/what-does-esocket-error-mean-when-im-trying-to-send-an-email
      };
    }
  }

  export class Mail {
    private readonly options = {
      mail: process.env.MAIL_SENDER || process.env.MAIL_USER,
      secure: false,
    };

    private readonly host = new MailConfig({
      name: process.env.MAIL_NAME || process.env.APP_URL,
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      secure: <any>process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        hash: process.env.MAIL_HASH,
      },
    });

    constructor() {
      Mail.verifyMailData();
    }

    private static verifyMailData() {
      if (!process.env.MAIL_HOST || !process.env.MAIL_USER) {
        console.warn('creds for mail missing!', __filename);
      }
    }

    public sendEmail(
      to: string,
      subject: string,
      html: string,
      replayTo: boolean = false,
      messageId: string = null,
      options: any = {}
    ) {
      return new Promise((resolve, reject) => {
        // setup email data with unicode symbols
        const mailOptions = {
          from: this.options.mail,
          secure: this.options.secure,
          to: to,
          subject: subject,
          html: html,
          inReplyTo: replayTo,
          replyTo: messageId,
          attachments: options.attatchments || options.pdf || [],
        };
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport(this.host.export());

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error || info.rejected.length) {
            if (error.code === 'EAUTH') {
              console.error(error);
              return reject({
                code: error.code,
                error: 'creds',
                message: 'Username or Password not accepted!',
                state: false,
              });
            } else if (!this.host.auth.pass) {
              console.warn('Password is empty. Is hash correct?');
            } else if (error.toString().includes('No recipients defined')) {
              return reject({
                code: error.code,
                error: 'sender',
                message: 'no sender address found',
                state: false,
              });
            }

            return reject({
              code: error.code,
              error: error.Error || error.response,
              message: 'error',
              info: info,
              state: false,
            });
          }

          resolve({
            accepted: info.accepted,
            messageId: info.messageId,
            code: null,
            error: null,
            message: info.response,
            info: info,
            state: true,
          });

          if (options.attatchments) {
            options.attatchments.forEach((item) => {
              if (item.path) {
                setTimeout(() => fs.unlink(item.path), 300);
              }
            });
          }
        });
      });
    }

    static path() {
      return require('path');
    }

    static loadTemplate(
      fileName,
      customTemplatePath: boolean = false,
      cb: any = null
    ) {
      const _fs = require('fs');
      const _path = require('path');
      try {
        let file = _fs.readFileSync(
          customTemplatePath
            ? _path.resolve(customTemplatePath, fileName)
            : _path.resolve(__dirname, 'templates/html', fileName),
          'utf-8'
        );

        return cb ? cb(file) : file;
      } catch (e) {
        console.log(
          'ERROR: loadTemplate:',
          fileName,
          ' not found.',
          customTemplatePath,
          e
        );
        _fs.readdir(_path.resolve(__dirname), (err, files) =>
          console.log(files)
        );
        return '';
      }
    }

    static parse(strng: string, keyPar) {
      if (!strng || !keyPar) return strng;
      for (let key in keyPar) {
        while (strng.includes(`[${key}]`))
          strng = strng.replace(`[${key}]`, keyPar[key]);
      }
      return strng;
    }
  }
}
