const router = require('express').Router();

const { getUserName } = require('../controllers/user')
const { noMethod } = require('../controllers/errorHandler');

router.get('/:user', getUserName)

router.use(noMethod)

module.exports = router;