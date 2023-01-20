const mongoose = require('mongoose')
const Player = require('../Player')

const playerSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    game: [{
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

module.exports = mongoose.model('players', playerSchema)