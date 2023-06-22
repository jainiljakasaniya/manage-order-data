const { Pool } = require('pg');
const { dbConfig } = require('./index');

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.name,
  password: dbConfig.password,
  port: dbConfig.port
});

module.exports = {
  dbConnPool: pool
};
