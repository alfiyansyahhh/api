const jwt = require('jsonwebtoken');
const { failed } = require('../helpers/respon');
const { JWT_SECRET } = require('../helpers/env');

const authentication = (req, res, next) => {
  const { signature } = req.headers;
  jwt.verify(signature, JWT_SECRET, (err, decoded) => {
    if (err) {
      failed(res, 401, 'signature error', 'invalid signature');
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = authentication;
