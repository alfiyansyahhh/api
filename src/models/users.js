const db = require('../config/db');

const usersModel = {
  register: (body, pass) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (username,password,level)
        VALUE (
          '${body.username}','${pass}','${body.level}'
        )`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  login: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where username='${body.username}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  cekUsernameRegis: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where username='${body.username}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  cekEmail: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where email_address='${body.email_address}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  getDetail: (id) => new Promise((resolve, reject) => {
    db.query(`select * from users where id='${id}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
 
};

module.exports = usersModel;
