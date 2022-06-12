const mongoose = require('mongoose');
const Schema = mongoose.Schema

const editedUser = new Schema({
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
        type: String,
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
    Adresse: {
        type: Number,
        require: true
    },
    Datum: {
        type: String,
        require: true
    }
   
}, {
    collection: 'editedUsers',
    versionKey: false
})

const editedUser_ = mongoose.model('editedUser', editedUser)
module.exports = editedUser_