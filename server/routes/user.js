const router = require('express').Router();

const { getUser } = require('../controllers/user')
const { noMethod } = require('../controllers/errorHandler');

router.get('/:user', getUser)

router.use(noMethod)

module.exports = router;