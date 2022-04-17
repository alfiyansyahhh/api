const db = require('../config/db');

const itemFlavor = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(`select * from itemflavor`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from itemflavor WHERE nameFlavor LIKE "%${search}%" 
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
      `SELECT * from itemlavor where id like "%${id}%"'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insertitemFlavor: (body) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO itemflavor (nameFlavor) VALUE ('${body.nameFlavor}')`,
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

module.exports = itemFlavor;
