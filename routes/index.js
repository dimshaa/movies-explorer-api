const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

// auth imitation
router.use((req, res, next) => {
  req.user = {
    _id: '634c0cfdfeadb66beb594180',
  };

  next();
});

router.use('/users', require('./users'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('No such directory'));
});

module.exports = router;
