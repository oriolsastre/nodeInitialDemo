const { check, validationResult } = require('express-validator');

const validatePlayer = [
    check('name').isLength({min: 1, max: 25}),
    check('level').isInt,
    check('password').exists().notEmpty().isLength({min:7, max:30}),
    check('email').exists().isEmail().notEmpty().isLength({max:100}),
    (req,res,next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            return res.status(403).json({errors: err.array()})
        }
    }
];

module.exports = { validatePlayer }