

window.addEventListener("load", function (event) {
    getWaterlevelsFromUser()
    createPDF()
});

function getWaterlevelsFromUser() {

    var Kundennummer = JSON.parse(localStorage.getItem('KundenInfo2'))[0].KundenNr

    // const data = { "Kundennummer": Kundennummer };

    fetch('http://localhost:4000/findWaterlevel?Kundennummer=' + Kundennummer, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then((result => result.json())).then(res => {
        if (res && Array.isArray(res) && res.length > 0) {
            sessionStorage.setItem("waterlevel", JSON.stringify(res))
        } else {
            window.alert("Fehler!")
        }
    })



}

function navtoLogin() {
    location.href = '../views/Login.html'
}


function open() {


    

}

function createPDF() {


    var array = JSON.parse(sessionStorage.getItem('waterlevel'))

  
    for(element of array){
    element.image = "https://media.istockphoto.com/vectors/pdf-download-vector-icon-vector-id1263032734?k=20&m=1263032734&s=612x612&w=0&h=RNUAjin6RWIpjr-NgvnASdxAwUE6pyUafrk6LcoyRNo="
    
    }
    const test = document.getElementById('container')
    let dataHTML = '';
    for(x of array){
        dataHTML += `
        <div class="column" onclick="test(this)">
        <img style=margin-left: 5px" "height="100px" width="100px" src="${x.image}">
        <div>
        <p  style="color:white">${x._id}</p>
        <p  style="margin-left:-20px;color:blue">${x.Straße} ${x.HausNr} /  ${x.Datum}</p>
        </div> </div>`
        
    }
    test.innerHTML = dataHTML;


}


function test(e){
    var id = e.children[1].children[0].outerText
    var array = JSON.parse(sessionStorage.getItem('waterlevel'))
    var filteredArray = array.filter(element => element._id == id)
    

    window.jsPDF = window.jspdf.jsPDF
    var doc = new jsPDF();

    var BescheidArray = filteredArray[0]


    var doc = new jsPDF('p', 'pt', 'letter')
    // Supply data via script
    var body = [
               ['Vorname', 'Nachname', 'KundenNr', 'TelefonNr',  'Straße', 'Nr', 'Ort', 'PLZ', 'Wasserstand'],
               [BescheidArray.Vorname, BescheidArray.Nachname, BescheidArray.KundenNr, BescheidArray.Telefon, BescheidArray.Straße, BescheidArray.HausNr, BescheidArray.Ort, BescheidArray.Plz, BescheidArray.Wasserstand],
               ]
    // generate auto table with body
    var y = 10;
    doc.setLineWidth(2);
    doc.text('Kundeninformationen:', 50, 150)
    doc.text(200, y = y + 30, "Bescheid für den " + BescheidArray.Datum);
    doc.autoTable({
        body: body,
        startY: 180,
        theme: 'grid',
                 })
    // save the data to this file

    doc.text('Kontakt Stadtwerke Zweibrücken:', 50, 300)
        doc.setFontSize(10);
    doc.text('Straße: Musterstraße 16',  50, 330)
    doc.text('Telefon: 787328372',  50, 360)
    doc.text('E-Mail: zweibrücken@gmail.com',  50, 390)
    doc.text('Sachbearbeiter/in: Anna Müller',  50, 420)
    doc.save('Bescheid');
    
    // doc.setFontSize(10);
    // doc.text('Bescheid', 10, 10)
    // doc.text('Vorname: ' + BescheidArray.Vorname, 10, 20);
    // doc.text('Nachname: ' + BescheidArray.Nachname, 10, 30);
    // doc.text('KundenNr: ' + BescheidArray.KundenNr, 10, 40);
    // doc.text('Straße: ' + BescheidArray.Straße + ' ' + BescheidArray.HausNr, 10, 50);
    // doc.text('Ort: ' + BescheidArray.Plz + ' ' + BescheidArray.Ort, 10, 60);
    // doc.text('Wasserstand: ' + BescheidArray.Wasserstand, 10, 70);
    // doc.text('Datum: ' + BescheidArray.Datum, 10, 80);
    // doc.save("Bescheid.pdf")
}


