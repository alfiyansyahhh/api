const db = require('../config/db');

const supplier = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(`select * from supplier`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search,fieldSearch , field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    console.log('masuk pa eko')
    db.query(`select * from supplier WHERE ${search}  LIKE "%${fieldSearch}%"
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
      `SELECT * from supplier where supplierUid like "${id}"`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insertSupplier: (body) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO supplier (number,SupplierName,linkman,gender,tel,email,address,remarks,enable) 
        VALUE ('${body.number}','${body.SupplierName}','${body.linkman}','${body.gender}','${body.tel}',
        '${body.email}','${body.address}','${body.remarks}','${body.enable}')`,
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

module.exports = supplier;
