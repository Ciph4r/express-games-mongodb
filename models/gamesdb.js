const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: {type: String , default: '', required: true ,unique: true, lowercase: true },
    description: {type: String , default: '', required: true},
    yearReleased: {type: String , default: ''},
    playTime: {type: Number , default: 0, required: true},
    secret: {type: String , default: '', required: true},
    timestamp: {type: Date , default: Date.now}
})

module.exports = mongoose.model('game' , gameSchema)