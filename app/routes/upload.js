const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

const { getUpload, uploadImatge } = require('../controllers/upload')
const { siImatgeMW } = require('../middlewares/siImatge');

router.use(fileUpload());

router.get('/', getUpload)
router.post('/', siImatgeMW, uploadImatge)

module.exports = router;