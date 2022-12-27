const express = require('express');
const cors = require('cors')
const router = express.Router();

const { getTime, postTime } = require('../controllers/time')
const { cacheControl, autoritzacio, bodyUser } = require('../middlewares/time');

router.use(cors(), express.json())

router.get('/', getTime)
router.post('/', [cacheControl, autoritzacio, bodyUser], postTime)

module.exports = router;