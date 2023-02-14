const router = require('express').Router();

const { getMessageR, postMessageUR } = require('../controllers/message');
const { noMethod } = require('../controllers/errorHandler');
const { authJWT } = require('../middlewares/authJWT')
const { existsUserMW, existsRoomMW } = require('../middlewares/validate')

router.use( authJWT )
router.post('/:room/:user', [existsUserMW, existsRoomMW], postMessageUR)
router.get('/:room', [existsRoomMW], getMessageR)    //retornar null si el room no existeix?
router.get('/:room/after/:timestamp', [existsRoomMW], (req,res)=>{return null})

router.use(noMethod)

module.exports = router;