const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

const { getUpload, postUpload } = require('../controllers/upload')
const { siImatgeMW } = require('../middlewares/siImatge');

router.use(fileUpload({createParentPath:true}));

router.get('/', getUpload)
router.post('/', siImatgeMW, postUpload)

module.exports = router;