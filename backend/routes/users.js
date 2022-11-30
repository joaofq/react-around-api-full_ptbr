const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getOneUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users/:userId', getUserById);

router.get('/users', getUsers);

router.get('users/me', getOneUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
