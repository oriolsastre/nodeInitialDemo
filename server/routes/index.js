const router = require('express').Router();
const fs = require('fs')
const { pageNotFound } = require('../controllers/errorHandler');

const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter(ruta => {
    const nomRuta = ruta.split(".").shift();
    if(nomRuta !== 'index'){router.use(`/${nomRuta}`, require(`./${ruta}`))}
})

router.use('/', pageNotFound)

module.exports = router;