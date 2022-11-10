const mysql = require('mysql');

const db = {
  shortid: require('shortid'),
  conn: mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
  }),
  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.conn.query(sql, params, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
};

module.exports = db;
