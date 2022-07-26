
var array;
function getWaterlevelsFromUser() {

    var Kundennummer = JSON.parse(localStorage.getItem('KundenInfo2'))[0].KundenNr

    // const data = { "Kundennummer": Kundennummer };



    fetch('http://localhost:4000/findWaterlevel?Kundennummer=' + Kundennummer, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then((result => result.json())).then(res => {
        console.log(res)
        array = res;

        if (res && Array.isArray(res) && res.length > 0) {


        } else {
            window.alert("Fehler!")
        }
    })



}

function navtoLogin() {
    location.href = '../views/Login.html'
  }






function createPDF() {
    getWaterlevelsFromUser()


    var data = [[1.0, 199.6], [2.0, 205.05], [3.0, 283.6], [4.0, 220.15], [5.0, 313.05]];
    window.jsPDF = window.jspdf.jsPDF
    var doc = new jsPDF();

    var lastArrayElement = array.at(-1)
    console.log(lastArrayElement)


    doc.setFontSize(10);
    doc.text('Bescheid', 10, 10)
    doc.text('Vorname: ' + lastArrayElement.Vorname, 10, 20);
    doc.text('Nachname: ' + lastArrayElement.Nachname, 10, 30);
    doc.text('KundenNr: ' + lastArrayElement.KundenNr, 10, 40);
    doc.text('Straße: ' + lastArrayElement.Straße + ' ' + lastArrayElement.HausNr, 10, 50);
    doc.text('Ort: ' + lastArrayElement.Plz + ' ' + lastArrayElement.Ort, 10, 60);
    doc.text('Wasserstand: ' + lastArrayElement.Wasserstand, 10, 70);
    doc.text('Datum: ' + lastArrayElement.Datum, 10, 80);
    doc.save("Bescheid.pdf")

}