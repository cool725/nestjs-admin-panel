import { ConnectionOptions } from 'typeorm';
import { doSeed } from '../../../../common/db/seed';
import { ReservationHeadEntity } from '../entities/reservation-head.entity';
import { ReservationLegEntity } from '../entities/reservation-leg.entity';
import { ReservationSourceEntity } from '../entities/reservation.source.entity';
import { ReservationProfilesEntity } from '../entities/reservation.profiles.entity';

const ReservationDBOptions = <ConnectionOptions>{
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 0),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  migrationsRun: true,
  logger: 'file',
  entities: [
    ReservationHeadEntity,
    ReservationLegEntity,
    ReservationSourceEntity,
    ReservationProfilesEntity,
  ],
};

doSeed([], ReservationDBOptions);

export default ReservationDBOptions;
