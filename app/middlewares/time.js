const cacheControl = (req, res, next) => {
    res.set('Cache-control', 'no-cache');
    next();
}

const autoritzacio = (req, res, next) => {
    next();
}


module.exports = { cacheControl, autoritzacio }