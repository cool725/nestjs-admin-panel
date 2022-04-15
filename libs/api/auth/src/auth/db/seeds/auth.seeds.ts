import { Connection, ConnectionOptions } from 'typeorm';
import { SeedHelper } from '../../../../../common/db/seed';
import { AuthUser } from '../../entities/auth.entity.user';

export class InitialUserSeeds extends SeedHelper {
  migrationName: string = this.constructor.name;

  migrationDelay = 1000;

  static getUserData() {
    return {
      email: process.env.APP_DEFAULT_USER,
      password: process.env.APP_DEFAULT_PASSWORD,
    };
  }

  public async doSeed(queryRunner: Connection): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const { email, password } = InitialUserSeeds.getUserData();
      if (!email || !password) return resolve(false);

      console.log('Seeding:', queryRunner.isConnected);
      console.log('Seeding:', email, password);

      const user = AuthUser.create();
      user.firstName = 'Demo';
      user.lastName = 'MovIT';

      user.setEmail(email).setPassword(password);

      if (!(await AuthUser.findOne({ where: { email } })))
        await user.save().catch((error: any) => {
          console.error(error);
          resolve(false);
        });

      return resolve(!!user.userId);
    });
  }
}
