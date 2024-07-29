import { knex } from 'knex';

const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'database_user',
      password: 'database_password',
      database: 'database_name',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default knexConfig;
