const router = require('express').Router();

const { postLogin, postLoginUser } = require('../controllers/login');
const { noMethod } = require('../controllers/errorHandler');

router.post('/', postLogin)
router.post('/user', postLoginUser);

router.use(noMethod)

module.exports = router;