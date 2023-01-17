const router = require('express').Router();

const { postLogin, postLoginUser } = require('../controllers/login');
const { authJWTMW } = require('../middlewares/authJWT');
const { noMethod } = require('../controllers/errorHandler');

router.post('/', postLogin)
router.post('/user', postLoginUser);

router.use(noMethod)

module.exports = router;