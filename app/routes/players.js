const router = require('express').Router();

const { getPlayers, postPlayers, putPlayers, deletePlayers } = require('../controllers/players');
//const { postPlayersMW } = require('../middlewares/players');

router.get('/', getPlayers)
router.post('/', postPlayers)
router.put('/:id', putPlayers)
router.delete('/:id', deletePlayers) //Aquest no és necessari

module.exports = router;