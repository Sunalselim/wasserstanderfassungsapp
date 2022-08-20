
function navtoLogin() {
  location.href = '../views/Login.html'
}
window.onload = () => {
  for (var element of JSON.parse(sessionStorage.getItem('KundenInfo'))) {

    var test = document.getElementById('username')
    document.getElementById('KdNr').innerHTML = "Kundennummer: " + element.KundenNr
    test.innerHTML = "Hallo " + element.Vorname + " !"
  }

}

function getWaterlevelsFromUser() {

  var Kundennummer = JSON.parse(sessionStorage.getItem('KundenInfo'))[0].KundenNr

  // const data = { "Kundennummer": Kundennummer };

  fetch('http://localhost:4000/findWaterlevel?Kundennummer=' + Kundennummer, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then((result => result.json())).then(res => {
    console.log(res)

    if (res && Array.isArray(res) && res.length > 0) {
      loadTable(res)


    } else {

    }
  })



}

getWaterlevelsFromUser()

var count = 0;

function loadTable(aData) {

  const tableBody = document.getElementById('historyTable')
  let dataHTML = '';


  for (var element of aData) {
    document.getElementById('username').innerHTML = "Hallo " + element.Vorname + " !"
    document.getElementById('KdNr').innerHTML = "Kundennummer: " + element.KundenNr
    dataHTML += `<tr><td>${count += 1}</td><td>${element.Adresse}</td></td><td>${element.Vorname}</td><td>${element.Nachname}</td><td>${element.Geb}</td>
            <td>${element.Straße}</td><td>${element.HausNr}</td> <td>${element.Plz}</td>
            <td>${element.Ort}</td><td>${element.Telefon}</td><td>${element.Datum}</td> <td>${element.Wasserstand}</td><td>${element._id}</td> 
            <td><deleteHistorybutton type="button" class="btn btn-danger  px-3"><i class="fa fa-trash" aria-hidden="true"></i></deleteHistorybutton> </td>`

  }

  tableBody.innerHTML = dataHTML;



}

function onPressImg() {
  location.href = "../views/home.html"
}



$(document).on("click", "deleteHistorybutton", function () {
  let tr = $(this).closest('tr');


  obj = {
    Vorname: tr[0].cells[2].textContent,
    Nachname: tr[0].cells[3].textContent,
    Adresse: tr[0].cells[1].textContent,
    Datum: tr[0].cells[10].textContent,
    Wasserstand: tr[0].cells[11].textContent,
    Id: tr[0].cells[12].textContent,
    Ort: tr[0].cells[8].textContent,
    Straße: tr[0].cells[5].textContent,
    Plz: tr[0].cells[7].textContent,
    Nr: tr[0].cells[6].textContent



  }

  sessionStorage.setItem('clickedData', JSON.stringify(obj))

  var modalWrap = null;
  if (modalWrap != null) {
    modalWrap.remove();
  }
  var oData = JSON.parse(sessionStorage.getItem('clickedData'))
  if (oData != null) {
    modalWrap = document.createElement('div')
    modalWrap.innerHTML = `
            <div class="modal fade" tabindex="-1" role="dialog" id="onClose">
                <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header" bg-light>
                        <h2 class="modal-title">Möchten Sie diesen Eintrag aus dem Verlauf endgültig 
                        entfernen?</h2>
                        <i class="fa fa-exclamation-circle fa-2x" style="color:#dc3545"></i>
                        </div>
                      <div class="modal-body">
                      <div class="list-group">
                      <li class="list-group-item list-group-item-danger"> Vorname: ${oData.Vorname}</li>
                      <li class="list-group-item list-group-item-danger"> Nachname: ${oData.Nachname}</li>
          <li class="list-group-item list-group-item-danger"> Adresse: ${oData.Adresse}</li>
         <li  class="list-group-item list-group-item-danger list-group-item-primary">Datum: ${oData.Datum}</li>
          <li  class="list-group-item list-group-item-danger list-group-item-secondary">Wasserstand: ${oData.Wasserstand}</li>
          <li  class="list-group-item list-group-item-danger list-group-item-secondary">Ort: ${oData.Ort}</li>
          <li  class="list-group-item list-group-item-danger list-group-item-secondary">Straße: ${oData.Straße} ${oData.Nr}</li>
          <li  class="list-group-item list-group-item-danger list-group-item-secondary">Plz: ${oData.Plz}</li>
               
                </div>
             <div class="modal-footer" bg-light>
                <button type="button" onclick="deleteItem()" data-bs-dismiss="modal" class="btn btn-primary">Ja</button>
                <buttonclose type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</buttonclose>
             </div>
            </div>
          </div>
        </div>
          `;

    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
    document.querySelector(".modal").addEventListener("click", function () {
      document.querySelector(".modal fade");

    })

  }

})

function deleteItem() {

  fetch('http://localhost:4000/deleteHistory/:id?id=' + JSON.parse(sessionStorage.getItem('clickedData')).Id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }).then((result => result.json())).then(res => {
    console.log(res)
  })

  location.reload()

}

$(document).on("click", "buttonclose", function () {
  $('#onClose').modal('hide')
})



