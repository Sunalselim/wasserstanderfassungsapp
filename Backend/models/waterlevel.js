const mongoose = require('mongoose');
const Schema = mongoose.Schema

const waterLevel = new Schema({
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
    Wasserstand:{
        type: String,
        require: true
    },
    Datum: {
        type: String,
        require: true
    }
   
}, {
    collection: 'waterlevels',
    versionKey: false
})

const waterlevel = mongoose.model('waterLevell', waterLevel)
module.exports = waterlevel