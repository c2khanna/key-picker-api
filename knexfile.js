// Update with your config settings.
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  }

};
