require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const users = require('./routes/users');
const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');
const { celebrate, Joi, errors, isCelebrateError } = require('celebrate');
const BadRequestError = require('./middlewares/errors/BadRequestError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser
);

app.use(auth);

app.use('/', users, cards);

app.get('/', (req, res) => {
  res
    .status(404)
    .send('O front-end ainda não está conectado! Volte em breve...');
});

app.get('*', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ocorreu um erro no servidor' : message,
  });
});

app.use(errors());

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError(
      'Request não pode ser completado. Erro validação celebrate.'
    );
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}.`);
});
