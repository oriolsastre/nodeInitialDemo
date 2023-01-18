const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

const { postUpload } = require('../controllers/upload')
const { siImatgeMW } = require('../middlewares/siImatge');

router.use(fileUpload({createParentPath:true}));

router.post('/', siImatgeMW, postUpload)

module.exports = router;