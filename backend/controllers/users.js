const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      throw new ServerError('Erro no servidor.');
    })
    .catch(next);
};

module.exports.getOneUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Usuário não encontrado.');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        throw new NotFoundError('Usuário não encontrado.');
      } else {
        throw new ServerError('Erro no servidor.');
      }
    })
    .catch(next);
};

module.exports.getUsersById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Usuário não encontrado.');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        throw new NotFoundError('Usuário não encontrado.');
      } else {
        throw new ServerError('Erro no servidor.');
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    })
      .then((user) => {
        res.send({
          data: user,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new UnauthorizedError(
            'Dados inválidos para criação de usuário'
          );
        } else if (err.name === 'MongoServerError') {
          throw new ConflictError('Usuário já existente.');
        } else {
          throw new ServerError('Erro no servidor.');
        }
      })
      .catch(next);
  });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true }
  )
    .select('+password')
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new UnauthorizedError(
          'Dados inválidos passados para atualizar perfil'
        );
      } else {
        throw new ServerError('Erro no servidor.');
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .select('+password')
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new UnauthorizedError(
          'Dados inválidos passados aos métodos para atualizar avatar'
        );
      } else {
        throw new ServerError('Erro no servidor.');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'AcBd1324JFPQ1984',
        {
          expiresIn: '7d',
        }
      );
      res.send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError('Usuário ou senha inválidos.');
    })
    .catch(next);
};
