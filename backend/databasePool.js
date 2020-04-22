const { Pool } = require('pg');
const databaseConfig = require('./hidden/databaseConf');

const pool = new Pool(databaseConfig);

module.exports = pool;
