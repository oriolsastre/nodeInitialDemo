const { sequelize } = require('./dbMySQL');
const Player = require('../models/Player');
const Game = require('../models/Game');
const { encrypt } = require('../helpers/password')

const designDB = async (lang='mysql') => {
    if(lang==='mysql'){
        Player.hasMany(Game, {foreignKey: 'player'})
        await sequelize.sync({ force: false })
        const admin = await Player.findOne({where: {id:1}})
        if(admin === null){
            //Per disseny el player id:1 serà l'administrador, que té level:0, i es genera en crear-se la taula.
            //Es comprova si existeix, i si no, és a dir, en la creació, es genera.
            const pswdAdmin = process.env.ADMIN_PASSWORD || '1234';
            const pswdHash = await encrypt(pswdAdmin)
            await Player.create({id: 1, name: 'Admin', password: pswdHash, level:0})
        }
    }
}

module.exports = { designDB };