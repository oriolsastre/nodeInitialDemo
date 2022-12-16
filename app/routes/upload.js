const express = require('express');
//const fileUpload = require('express-fileupload');

const router = express.Router();


router.get('/', (req,res) => {
    res.render('index', {title: "Pujar imatge"})
})

router.post('/', (req,res) => {
    //req.is(type)
        //https://pqina.nl/blog/upload-image-with-nodejs/
    res.render("index", {title: "Imatge pujada"})
})

module.exports = router;