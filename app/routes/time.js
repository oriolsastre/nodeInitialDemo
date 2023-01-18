const express = require('express');
const cors = require('cors')
const router = express.Router();

const { postTime } = require('../controllers/time')
const { cacheControl, autoritzacio } = require('../middlewares/time');

router.use(cors(), express.json())

router.post('/', [cacheControl, autoritzacio], postTime)

module.exports = router;