import {
  BaseEntity,
  Connection,
  ConnectionOptions,
  createConnection,
  getConnection,
  getConnectionManager,
} from 'typeorm';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';

export abstract class SeedHelper {
  // Name of the migration. this will be saved in to the DB
  abstract readonly migrationName: string;

  // Delay till doSeed will be executed
  readonly migrationDelay: number = 1000;

  constructor() {}

  public init(connection: Connection) {
    return new Promise<boolean>(async (resolve) => {
      const canMigrate = await this.canMigrate(connection);
      if (canMigrate) {
        setTimeout(async () => {
          if (!connection.isConnected) await connection.connect();
          const success = await this.doSeed(connection);
          if (success) {
            return this.logMigrate(connection)
              .then((done) => this.end(connection))
              .then(() => resolve(true));
          } else return this.end(connection).then(() => resolve(false));
        }, this.migrationDelay || 0);
      } else return this.end(connection).then(() => resolve(false));
    });
  }

  abstract doSeed(conn: Connection): Promise<boolean>;

  public getParameterPlaceHolder(num = 1) {
    switch (process.env.DB_TYPE) {
      case 'postgres':
        return `$` + num;
      default:
        return '?';
    }
  }

  public getParameterPlaceHolders(total = 1) {
    let result = ``;
    for (let i = 0; i < total; i++)
      result +=
        this.getParameterPlaceHolder(i + 1) + (i + 1 == total ? '' : ',');

    return result;
  }

  private async canMigrate(connection: Connection) {
    if (!this.migrationName) {
      this.end(connection);
      throw 'Error: migrationName not set';
    }

    if (!connection.isConnected) await connection.connect();

    return connection
      .query(
        'select * from migrations where name = ' +
          this.getParameterPlaceHolder(),
        [this.migrationName]
      )
      .then((r) => r.length === 0);
  }

  private logMigrate(connection: Connection) {
    return connection.query(
      `insert into migrations ( name , timestamp ) values (${this.getParameterPlaceHolder()},
                                                    ${
                                                      this.getParameterPlaceHolder() ==
                                                      '?'
                                                        ? 'now()'
                                                        : 'ROUND (extract(epoch from now()))'
                                                    })`,
      [this.migrationName]
    );
  }

  protected end(connection: Connection) {
    return connection.close();
  }
}

interface ISeedHelper {
  new (a?: any, b?, c?: boolean): SeedHelper;
}

export const doSeed = async (
  Seeds: ISeedHelper[],
  dbConfig,
  entities: any[] = []
) => {
  // wait till application has initialised
  setTimeout(async () => {
    const init = async (dbConnection) => {
      for (let i = 0; i < Seeds.length; i++) {
        await new Seeds[i](dbConfig, entities, false).init(dbConnection);
      }
    };

    init(
      new Connection({
        ...dbConfig,
        entities: [...dbConfig.entities, ...entities],
        name: 'seeder' + Math.random(),
      })
    );
  }, 8000);
};
