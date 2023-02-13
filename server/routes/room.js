const router = require('express').Router();

const { postRoom } = require('../controllers/room');
const { noMethod } = require('../controllers/errorHandler');
const { existsNotRoomMW } = require('../middlewares/validate')

router.post('/', existsNotRoomMW, postRoom)

router.use(noMethod)

module.exports = router;