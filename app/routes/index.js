const router = require('express').Router();
const fs = require('fs')

const { authJWTMW } = require('../middlewares/authJWT')
const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter(ruta => {
    const nomRuta = ruta.split(".").shift();
    if(nomRuta !== 'index'){
        nomRuta === 'login' ? router.use(`/${nomRuta}`, require(`./${ruta}`)) : router.use(`/${nomRuta}`, authJWTMW, require(`./${ruta}`))
    }
})

module.exports = router;