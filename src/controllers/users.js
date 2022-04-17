const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');
const { success, failed } = require('../helpers/respon');
const { JWT_SECRET } = require('../helpers/env');

const users = {

  register: (req, res) => {
    const { body } = req;
    usersModel.cekUsernameRegis(body).then((result) => {
        if (!result.length <= 0) {
            failed(res, 100, 'username sudah ada');
        } else {
            bcrypt.hash(body.password, 10, (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                failed(res, 401, err);
            } else {
                usersModel.register(body, hash).then((result2) => {
                    success(res, result2, 'succes');
                }).catch((err1) => {
                    failed(res, 401, err1);
                });
            }
            });
        }
    }).catch((err) => {
        failed(res, 401, err);
    });
  },

  login: (req, res) => {
    const { body } = req;
    usersModel.login(body).then((result) => {
        if (result.length <= 0) {
            failed(res, 401, 'username salah');
        } else {
            const passwordHash = result[0].password;
            bcrypt.compare(body.password, passwordHash, (error, checkpassword) => {
            if (error) {
                res.json(error);
            } else if (checkpassword === true) {
                const user = result[0];
                const payload = {
                    id: user.id,
                };
                const output = {
                    id: user.id,
                    username: user.username,
                    level: user.level,
                    signature: jwt.sign(payload, JWT_SECRET),
                };
                success(res, output, 'Login succes');
            } else {
                failed(res, 401, 'Wrong Password');
            }
            });
        }
    }).catch((err) => {
        failed(res, 401, err);
    });
  },
};

module.exports = users;
