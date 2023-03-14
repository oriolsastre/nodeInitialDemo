const router = require('express').Router();

const { getUserName, postUser } = require('../controllers/user')
const { noMethod } = require('../controllers/errorHandler');
const { validUserMW } = require('../middlewares/validate');

router.get('/:user', getUserName)
router.post('/', validUserMW, postUser)

router.use(noMethod)

module.exports = router;