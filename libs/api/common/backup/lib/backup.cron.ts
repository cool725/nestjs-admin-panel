import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { BackupSQL } from './backup.sql';
import { BackupFTP } from './backup.ftp';

@Injectable()
export class BackupCronTask {
  private readonly logger = new Logger('Backup');

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  handleCron() {
    this.logger.debug('Backup started started');
    Promise.all([
      BackupSQL.dumpDatabase(),
      // files
    ]).then(([sql]) =>
      BackupFTP.archive([sql.file], sql.file.split('.').shift()).then(
        (result) => sql.unlink()
      )
    );
  }
}
