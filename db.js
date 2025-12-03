const { Pool } = require('pg');

const pool = new Pool({
  user: "neondb_owner",
  host: "ep-winter-mountain-acgbn659-pooler.sa-east-1.aws.neon.tech",
  database: "neondb",
  password: "npg_Rx6YiUaMw3qT",
  port: 5432,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
