import { Connection } from 'typeorm';
import { SeedHelper } from '../../../../../common/db/seed';

export class InitialProfilesSourceSeeds extends SeedHelper {
  migrationName: string = this.constructor.name;

  public async doSeed(queryRunner: Connection): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const values = [
        { title: 'Website' },
        { title: 'Facebook' },
        { title: 'Instagram' },
        { title: 'Friends' },
        { title: 'Place' },
        { title: 'Others' },
      ];

      for (let i = 0; i < values.length; i++) {
        const id = i;
        const { title } = values[i];
        // const entity = .create();
        // Object.assign(entity, values[i])
        // await entity.save()
      }

      return resolve(false);
    });
  }
}
