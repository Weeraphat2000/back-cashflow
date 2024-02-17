const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "hun516414",
  database: "cashflowtacker",
});

const exicute = async (sql, value) => {
  const [reult] = await pool.execute(sql, value);
  return reult;
};
module.exports = { pool, exicute };
