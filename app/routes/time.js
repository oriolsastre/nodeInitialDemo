const express = require('express');
const cors = require('cors')
const router = express.Router();

const { getTime, postTime } = require('../controllers/time')
const { cacheControl, autoritzacio } = require('../middlewares/time');

router.use(cors())

router.get('/', getTime)
router.post('/', [cacheControl, autoritzacio], postTime)

module.exports = router;