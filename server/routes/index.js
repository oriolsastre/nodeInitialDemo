const router = require('express').Router();
const fs = require('fs')

const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter(ruta => {
    const nomRuta = ruta.split(".").shift();
    if(nomRuta !== 'index'){router.use(`/${nomRuta}`, require(`./${ruta}`))}
})

module.exports = router;