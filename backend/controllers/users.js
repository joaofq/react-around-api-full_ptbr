const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Erro' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('Id não encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        const ERROR_CODE = 404;
        res.status(ERROR_CODE).send({ message: 'Usuário não encontrado' });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Erro' });
      }
    });
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
        res.send({ data: user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const ERROR_CODE = 400;
          res.status(ERROR_CODE).send({ message: 'Dados inválidos' });
        } else {
          const ERROR_CODE = 500;
          res.status(ERROR_CODE).send({ message: 'Erro' });
        }
      })
      .catch(next);
  });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'validationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({
          message: 'Dados inválidos',
        });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Erro' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'validationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({
          message: 'Dados inválidos',
        });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Erro' });
      }
    });
};
