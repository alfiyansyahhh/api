const db = require('../config/db');

const itemBrand = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(`select * from itembrand`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from itembrand WHERE brandName LIKE "%${search}%" 
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
      `SELECT * from itembrand where id like "%${id}%"'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insertitembrand: (body) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO itembrand (brandName) VALUE ('${body.brandName}')`,
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

module.exports = itemBrand;
