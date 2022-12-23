const express = require('express');
const router = express.Router();

const { getTime, postTime } = require('../controllers/time')

router.get('/', getTime)

module.exports = router;