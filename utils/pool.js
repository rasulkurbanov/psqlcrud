const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'userrestapi',
  password: 8605774,
  port: 5432
})

module.exports = pool