const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        index: {
            unique: true,
            partialFilterExpression: {name: {$type: "string"}}
        }//permet unique però també null, és a dir, l'index unique s'aplica quan el tipus és string, quan hi ha una valor https://stackoverflow.com/questions/7955040/mongodb-mongoose-unique-if-not-null
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    password: String,
    games: [{
        dau1: {
            type: Number,
            required: true
        },
        dau2:  {
            type: Number,
            required: true
        },
        victoria: {
            type: Boolean
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    }]
},{
    timestamps: true,
    versionKey: false
})
playerSchema.methods.victory_rate = () => {
    if(this.games === undefined || this.games.length===0){return null}
    const sumaVictoria = this.games.reduce((acc,cur) => acc+cur, 0)
    return sumaVictoria/this.games.length;
}
playerSchema.methods.games_played = () => this.games === undefined ? 0 : this.games.length;

module.exports = mongoose.model('players', playerSchema)