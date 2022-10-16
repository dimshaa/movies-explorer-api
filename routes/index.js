const router = require('express').Router();

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

// auth imitation
router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('No such directory'));
});

module.exports = router;
