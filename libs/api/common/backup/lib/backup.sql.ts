var fs = require('fs'),
  path = require('path'),
  moment = require('moment'),
  exec = require('child_process').exec;

export class BackupSQL {
  static backupPath = './backup';
  static dumpDatabase(
    DB_USER: string = process.env.DB_USERNAME,
    DB_PASSWORD: string = process.env.DB_PASSWORD,
    DB_NAME: string = process.env.DB_DATABASE
  ): Promise<{ path: string; file: string; unlink(): void }> {
    const fileName = DB_NAME + '_' + moment().format('YYYY-MM-DD');
    const output = path.resolve(BackupSQL.backupPath, fileName + '.sql');
    if (!fs.existsSync(BackupSQL.backupPath)) {
      fs.mkdirSync(BackupSQL.backupPath);
    }
    return new Promise((pResolve, pReject) =>
      exec(
        'mysqldump -u ' +
          DB_USER +
          ` --password="${DB_PASSWORD}" ` +
          DB_NAME +
          ' > ' +
          output,
        (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            return pReject(err);
          }

          // the *entire* stdout and stderr (buffered)
          pResolve({
            file: output,
            path: path.resolve(BackupSQL.backupPath),
            unlink: () => {
              try {
                fs.unlink(output);
              } catch (e) {}
            },
          });
        }
      )
    );
  }
}
