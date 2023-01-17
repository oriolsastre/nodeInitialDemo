const router = require('express').Router();

const { postLogin } = require('../controllers/login');
const { noMethod } = require('../controllers/errorHandler')

router.post('/', postLogin);

router.use(noMethod)

module.exports = router;