const { failed } = require('../helpers/respon');
const usersModel = require('../models/users');

const authorization = {
  isAdmin: (req, res, next) => {
    const id = req.userId;
    usersModel.getDetail(id).then((result) => {
      if (result[0].level === 0) {
        next();
      } else {
        failed(res, 401, 'Unauthorized', 'hanya admin');
      }
    }).catch((err) => {
      failed(res, 500, err);
    });
  },

};

module.exports = authorization;
