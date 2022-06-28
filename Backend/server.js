const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const allUsers = require('../Backend/models/allUsers')
const waterlevel = require('../Backend/models/waterlevel')
const editedUser_ = require('../Backend/models/editedUser')

const app = express();
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://Selim:hallo@wasserstandapp.tudxitk.mongodb.net/Wasserstand?retryWrites=true&w=majority');

app.use(express.static('public', {
    setHeaders: function setHeaders(res, path, stat) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET');
        // res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
}));

app.use(cors());

//var singleUser;

app.get('/allUsers', (req, res) => {
    allUsers.find({}, function (err, allUsers) {
        res.json(allUsers)
    })

})

// app.post('/singleUser', (req, res) => {
//     // singleUser = req.body.Kundennummer
//     global.singleUser = req.body.Kundennummer

// })

app.get('/findCustomer', (req, res) => {

    var result;

    if (req.query && req.query.Kundennummer) {
        allUsers.find({ KundenNr: req.query.Kundennummer})
            .then((mongoResult) => {
                res.status(200).send(JSON.stringify(mongoResult));
                return;
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        res.status(500).send("Please provide a customer number");
        return;
    }
})

app.get('/findWaterlevel', (req, res) => {

    var result;

    if (req.query && req.query.Kundennummer) {
        waterlevel.find({ KundenNr: req.query.Kundennummer})
            .then((mongoResult) => {
                res.status(200).send(JSON.stringify(mongoResult));
                return;
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        res.status(500).send("Please provide a customer number");
        return;
    }
})




// app.get('/findCustomer', (req, res) => {

//     if (req.query && req.query.Kundennummer) {
//         allUsers.find({ KundenNr: singleUser })
//             .then((result) => {
//                 res.json(result)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     } else {
//         res.status(500).send("Please provide a customer number");
//     }
// })

app.post('/waterlevel', (req, res) => {
    console.log(req.body)
    const waterLevel = new waterlevel({
        Vorname: req.body.Vorname,
        Nachname: req.body.Nachname,
        KundenNr: req.body.KundenNr,
        Geb: req.body.Geb,
        Straße: req.body.Straße,
        HausNr: req.body.HausNr,
        Plz: req.body.Plz,
        Ort: req.body.Ort,
        Telefon: req.body.Telefon,
        Wasserstand: req.body.wasserstand,
        Datum: req.body.Datum
    })
    waterLevel.save()

})



app.post('/editedUser', (req, res) => {
    console.log(req.body)
    const editedUser = new editedUser_({
        Vorname: req.body.Vorname,
        Nachname: req.body.Nachname,
        KundenNr: req.body.KundenNr,
        Geb: req.body.Geb,
        Straße: req.body.Straße,
        HausNr: req.body.Hausnummer,
        Plz: req.body.Plz,
        Ort: req.body.Ort,
        Telefon: req.body.Telefon,
        Adresse: req.body.Adresse,
        Datum: req.body.Datum
    })
    editedUser.save()

})


app.listen(4000, function () {
    console.log('Server is running')

})