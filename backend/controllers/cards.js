const Card = require('../models/card');

const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      throw new ServerError('Erro do servidor ao tentar puxar cards');
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new UnauthorizedError('Dados inválidos ao tentar criar cartão');
      } else {
        throw new ServerError(
          'Erro interno do servidor ao tentar criar cartão'
        );
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new UnauthorizedError('Usuário não autorizado para deletar card.');
    })
    .then((card) => {
      if (card && req.user._id.toString() === card.owner.toString()) {
        Card.deleteOne(card).then((deletedCard) => {
          res.send(deletedCard);
        });
      } else if (!card) {
        throw new NotFoundError('Cartão não encontrado.');
      } else {
        throw new UnauthorizedError(
          'Usuário não autorizado para deletar card.'
        );
      }
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        const ERROR_CODE = 404;
        throw new NotFoundError('Cartão não encontrado.');
      } else {
        throw new ServerError('Erro no servidor.');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new UnauthorizedError('Cartão não encontrado.');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        throw new NotFoundError('Cartão não encontrado.');
      } else {
        throw new ServerError('Erro no servidor.');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new UnauthorizedError('Nenhum cartão encontrado');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        throw new NotFoundError('Cartão não encontrado.');
      } else {
        throw new ServerError('Erro no servidor.');
      }
    })
    .catch(next);
};
