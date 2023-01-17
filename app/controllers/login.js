const Player = require('../models/Player')

const { compare, basicUserPswd } = require('../helpers/password')
const { handleErrorResponse } = require('../helpers/error')
const { tokenSign } = require('../helpers/jwt')

const postLogin = async (req,res) => {
    res.status(200).json({token:''})
}

const postLoginUser = async (req,res) => {
    try {
        if(!req.headers.authorization){return res.status(401).json({Error: "You must provide a user and password"})}
        const [user, password] = basicUserPswd(req.headers.authorization)
        if(user === '' || password === ''){return res.status(400).json({Error: "You must provide a user name and a password"})}
        const playerLogin = await Player.findOne({where: {name: user}})
        if(playerLogin === null){return res.status(404).json({Error: "Player not found"})}
        const check = await compare(password,playerLogin.password)
        if(!check){return res.status(401).json({Error: "Wrong password"})}
        if(playerLogin.level!==0){return res.status(403).json({Error: "You are not allowed to log in. Only administrators can log in."})}
        const token = tokenSign(playerLogin)
        res.status(200).json({token})
    } catch (error) { handleErrorResponse(res, error) }
}

module.exports = { postLogin, postLoginUser }