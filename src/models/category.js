const db = require('../config/db');

const category = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(`select * from category`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from category WHERE categoryName LIKE "%${search}%" 
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
      `SELECT * from category where id like "${id}"`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insertcategory: (body) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO category (categoryUid,categoryName) 
        VALUE ('${body.categoryUid}','${body.categoryName}')`,
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

module.exports = category;
