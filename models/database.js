const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'supply_chain',
  password: 'your_password',
  port: 5432,
});
module.exports = pool;