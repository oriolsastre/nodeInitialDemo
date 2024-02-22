const router = require('express').Router();

const { getPlayers, postPlayers, putPlayers, deletePlayers } = require('../controllers/players');
const { noMethod, noID } = require('../controllers/errorHandler')
const { invalidIDMW } = require('../middlewares/invalidID');
const { emptyValues } = require('../middlewares/validatePlayer')

router.get('/', getPlayers)
router.post('/', emptyValues, postPlayers)
router.put('/:id', invalidIDMW, putPlayers)
router.delete('/:id', invalidIDMW, deletePlayers) //Aquest no és necessari

router.put('/', noID)

router.use(noMethod)

module.exports = router;