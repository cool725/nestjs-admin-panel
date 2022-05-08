const { env } = require('../libs/api/common/utils');
const path = require('path');

env.load(path.resolve('../'));

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 0),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  migrationsTableName: 'migrations',
  //"entities": [__dirname+'/**/*.ts'],
  migrations: ['migrations/src/*.js'],
  cli: {
    migrationsDir: 'migrations/src',
  },
};
