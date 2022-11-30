const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../middlewares/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization denied');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'AcBd1324JFPQ1984'
    );
  } catch (err) {
    throw new UnauthorizedError('Authorization denied');
  }

  req.user = payload;

  next();
};
