const { Client } = require('pg');
const {localConnectionString} = require('./../constants');

const connectionString = process.env.ENVIRONMENT === "local" ? localConnectionString : "";

const initDBClient = () => {
  return new Client({
    connectionString,
  })
}

module.exports = {
  initDBClient,
}
