const router = require('express').Router();

const { getRanking, getWinner, getLoser } = require('../controllers/Ranking');
const { noMethod } = require('../controllers/errorHandler')

router.get('/', getRanking);
router.get('/winner', getWinner);
router.get('/loser', getLoser);

router.use(noMethod)

module.exports = router;