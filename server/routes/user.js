const router = require('express').Router();

const { getUserName, postUser } = require('../controllers/user')
const { noMethod } = require('../controllers/errorHandler');

router.get('/:user', getUserName)
router.post('/', postUser)

router.use(noMethod)

module.exports = router;