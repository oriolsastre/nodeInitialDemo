const router = require('express').Router();

const { getGames, postGames, deleteGames } = require('../controllers/games');
const { noMethod, noID } = require('../controllers/errorHandler')
const { invalidIDMW } = require('../middlewares/invalidID')

router.get('/:id', invalidIDMW, getGames)
router.post('/:id', invalidIDMW, postGames)
router.delete('/:id', invalidIDMW, deleteGames)

router.get('/', noID)
router.post('/', noID)
router.delete('/', noID)

router.use(noMethod)

module.exports = router;