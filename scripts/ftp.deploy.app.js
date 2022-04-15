const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const FtpDeployApp = require('ftp-deploy');

const ftpDeploy = new FtpDeployApp();

const read = (question) =>
  new Promise((resolve) => rl.question(question + ' ', resolve));

(async () => {
  // configuration
  const servers = {
    staging: {
      user: 'sshmovit.ch',
      password: '&Q6lfh98.',
      host: '188.68.37.98',
    },
    production: {},
  };
  const applications = {
    selected:
      process.argv.find((arg) => arg.includes('--name=')) ||
      (await read('Name of Application?')),
    type:
      process.argv.find((arg) => arg.includes('--typ=')) ||
      (await read('Type: api or app?')),
    app: {
      dynamic: {
        name: '',
        include: ['*', '**/*'],
        remoteRoot: '/httpdocs/apps/[TYP]/app',
        localRoot: path.resolve(__dirname, '../dist/apps/app/[TYP]'),
      },
    },
    api: {
      dynamic: {
        name: '',
        include: ['*', '**/*'], //  '.env'
        remoteRoot: '/httpdocs/apps/[TYP]/api',
        localRoot: path.resolve(__dirname, '../dist/apps/api/[TYP]'),
      },
    },
    getConfig(type, appName) {
      const obj = JSON.parse(JSON.stringify(this[type]['dynamic']));
      obj.name = type;
      obj.remoteRoot = obj.remoteRoot.replace('[TYP]', appName);
      obj.localRoot = obj.localRoot.replace('[TYP]', appName);
      return obj;
    },
  };

  let appType = applications.type.split('=').pop() || 'app';
  let appName = applications.selected.split('=').pop();

  const selectedServer = { ...servers.staging };
  const selectedApp = applications.getConfig(appType, appName);

  if (!applications.selected)
    throw new Error('Appname not specified. pass arg name=');

  if (!appName || !selectedApp) throw new Error('Appname not valid.');

  const configBase = {
    port: 21,
    ...selectedServer,
    ...selectedApp,
    exclude: ['storage/**', 'uploads/**', '*.scss', '*.ts'],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: true,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
  };

  if (process.argv.includes('--verbose')) {
    console.log('VERBOSE');
    console.log('Start: ', appType + ':' + appName);
    ftpDeploy.on('uploading', function (data) {
      console.log(
        data.totalFilesCount,
        data.transferredFileCount + 1,
        data.filename
      ); // partial path with filename being uploaded
    });
    ftpDeploy.on('upload-error', function (data) {
      console.log(data.err); // data will also include filename, relativePath, and other goodies
    });
  }

  await ftpDeploy
    .deploy({ ...configBase })
    .then((res) => {
      console.log('finished:', 'OK', appType + ':' + appName, '\n');
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(0);
    });
})().catch(() => process.exit(0));
