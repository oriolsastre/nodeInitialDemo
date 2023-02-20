const router = require('express').Router();

const { getRooms, postRoom } = require('../controllers/room');
const { noMethod } = require('../controllers/errorHandler');
const { authJWT } = require('../middlewares/authJWT')
const { existsNotRoomMW } = require('../middlewares/validate')

router.use( authJWT )
router.get('/', getRooms)
router.post('/', existsNotRoomMW, postRoom)

router.use(noMethod)

module.exports = router;