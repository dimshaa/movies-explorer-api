const router = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { checkUpdateUserInfo } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch('/me', checkUpdateUserInfo, updateUserInfo);

module.exports = router;
