var fs = require('fs'),
  spawn = require('child_process').spawn;

/* ZIP files and send to FTP Server*/
export class BackupFTP {
  static archive(files: string[], outputPath, ftp = null) {
    return new Promise((resolve) => {
      // require modules
      const path = require('path');
      const fs = require('fs');
      const archiver = require('archiver');
      const outputFilePath = path.resolve(outputPath + '.zip');
      // create a file to stream archive data to.
      try {
        fs.unlinkSync(outputFilePath);
      } catch (e) {}

      const output = fs.createWriteStream(outputFilePath);
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });

      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on('close', function () {
        /*
        console.log(archive.pointer() + ' total bytes');
        console.log(
          'archiver has been finalized and the output file descriptor has closed.'
        );
        * */

        if (ftp) {
          return BackupFTP.sendFTP(outputFilePath, ftp);
        }

        resolve(true);
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', function () {
        console.log('Data has been drained');
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          // log warning
          console.warn('Warrning: BackupFTP');
          console.warn(err);
        } else {
          // throw error
          throw err;
        }
      });

      // good practice to catch this error explicitly
      archive.on('error', function (err) {
        throw err;
      });

      // pipe archive data to the file
      archive.pipe(output);

      // append a file from stream
      for (let i = 0; i < files.length; i++) {
        const file1 = path.resolve(files[i]);
        archive.append(fs.createReadStream(file1), {
          name: file1.split('\\').pop().split('/').pop(),
        });
      }

      // append files from a sub-directory and naming it `new-subdir` within the archive
      // archive.directory('subdir/', 'new-subdir');

      // append files from a sub-directory, putting its contents at the root of archive
      //archive.directory(path.resolve(sourcePath, '/'), false);

      // append files from a glob pattern
      //archive.glob('file*.txt', { cwd: __dirname });

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
      archive.finalize();
    });
  }
  static sendFTP(filePath, ftpSettings) {
    return new Promise((resolve) => {
      resolve(filePath);
    });
  }
}
