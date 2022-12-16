const express = require('express');
const fileUpload = require('express-fileupload');

const router = express.Router();


router.get('/', (req,res) => {
    res.render('index', {title: "Pujar imatge"})
})

router.post('/', fileUpload(), (req,res) => {
    //req.imatge o alguna cosa així serà la imatge.
    //https://pqina.nl/blog/upload-image-with-nodejs/
    res.render("index", {title: "Imatge pujada"})
})

module.exports = router;