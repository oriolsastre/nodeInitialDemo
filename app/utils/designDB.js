const { encrypt } = require('../helpers/password')

const designDB = async (lang) => {
    if(lang==='mysql'){
        const { sequelize } = require('./dbMySQL');
        const Player = require('../models/Player');
        const Game = require('../models/Game');
        
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
    }else if(lang==='mongo'){
        const connectMongo = require('./dbMongo');
        const Player = require('../models/Mongo/Player')
        
        connectMongo()
        const admin = await Player.findOne({name: 'Admin'})
        if(admin === null){
            const pswdAdmin = process.env.ADMIN_PASSWORD || '1234';
            const pswdHash = await encrypt(pswdAdmin)
            Player.create({id:0, name: 'Admin', password: pswdHash, level: 0}, (err) => {
                if(err) console.log(err)
            })
            console.log("S'ha afegit un administrador");
        }
    }else{
        console.log("No s'ha pogut connectar a cap base de dades. Has d'iniciar l'API amb los ordres 'npm run mysql' o 'npm run mongo'");
        process.exit(0)
    }
}

module.exports = { designDB };