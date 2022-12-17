const express = require('express');
const fileUpload = require('express-fileupload');
const {siImatgeMW} = require('../middlewares/siImatge');

const router = express.Router();

router.use(fileUpload());

router.get('/', (req,res) => {
    res.render('index', {title: "Pujar imatge"})
})

router.post('/', siImatgeMW, (req,res) => {
    //req.is(type)
        //https://pqina.nl/blog/upload-image-with-nodejs/
    console.log(req.files)
    const fitxerPujat = req.files.fitxer;

    res.render("index", {title: "Nivell 1, Exercici 2"})
})

module.exports = router;