const router = require('express').Router();

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');
const { checkCreateUser, checkLogin } = require('../middlewares/validation');

router.post('/signup', checkCreateUser, createUser);
router.post('/signin', checkLogin, login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.all('*', (req, res, next) => {
  next(new NotFoundError('No such directory'));
});

module.exports = router;
