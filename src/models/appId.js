const db = require('../config/db');

const appId = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(`select * from appId`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search) => new Promise((resolve, reject) => {
    db.query(`select * from appId WHERE appId LIKE "%${search}%"`, (err, result) => {
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
      `SELECT * from appId where id like "%${id}%"'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insertAppId: (body) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO appId (appId) VALUE ('${body.appId}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  update: (body, id) => new Promise((resolve, reject) => {
    db.query(`update appId set appId='${body.appId}' where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(`delete from appId where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = appId;
