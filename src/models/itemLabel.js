const db = require('../config/db');

const itemLabel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(`select * from itemlabel`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from itemlabel WHERE nameLabel LIKE "%${search}%" 
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
      `SELECT * from itemlabel where id like "%${id}%"'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insertitemLabel: (body) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO itemLabel (nameLabel) VALUE ('${body.nameLabel}')`,
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

module.exports = itemLabel;
