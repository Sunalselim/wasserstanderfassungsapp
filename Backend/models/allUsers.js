const mongoose = require('mongoose');
const Schema = mongoose.Schema

const allUsersSchema = new Schema({
    Vorname: {
        type: String,
        require: true
    },
    Nachname: {
        type: String,
        require: true
    },
    KundenNr: {
        type: Number,
        require: true
    },
    Geb: {
        type: String,
        require: true
    },
    Straße: {
        type: String,
        require: true
    },
    HausNr: {
        type: Number,
        require: true
    },
    Plz: {
        type: Number,
        require: true
    },
    Ort: {
        type: String,
        require: true
    },
    Telefon: {
        type: Number,
        require: true
    },
}, {
    collection: 'allUsers',
    versionKey: false
})

const allUsers = mongoose.model('allUsers', allUsersSchema)
module.exports = allUsers