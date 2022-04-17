const db = require('../config/db');

const mainUnit = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(`select * from mainunit`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from mainunit WHERE mainunit LIKE "%${search}%" 
    ORDER BY ${field} ${typeSort}
    LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getDetails: (id) => new Promise((resolve, reject) => {
    db.query(
      `SELECT * from mainunit where id like "%${id}%"'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insertmainUnit: (body) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO mainunit (mainunit) VALUE ('${body.mainunit}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
};

module.exports = mainUnit;
