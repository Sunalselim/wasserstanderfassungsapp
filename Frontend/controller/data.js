
// window.onload = () => {

//   function getFoundUser() {
//     var data = fetch('http://localhost:4000/findCustomer', {
//       method: 'GET'

//     })
//     return data
//   }


//   getFoundUser().then(response => response.json())
//     .then(data => {
//       loadTable(data)

//     });

// }

var value1 = 0;
var value2 = 0;
var value3 = 0
var value4 = 0
var value5 = 0
var value6 = 0
var value7 = 0
var value8 = 0

var Vorname_;
var Nachname_;
var Straße_;
var Hausnummer_;
var plz_;
var Ort_;
var Telefonummer_;
var Adresse;
var Kundennummer_;
var Geb_;



window.onload = () => {

  //hier aus session storage Kundenummer auslesen
  let KundenInfo = JSON.parse(sessionStorage.getItem('KundenInfo'))
  if (!KundenInfo) {
    window.alert("Kundennummer verloren :(");
  }
  loadTable(KundenInfo);

}

let sortDirection = false;

function loadTable(aData) {

  const tableBody = document.getElementById('tableData')
  let dataHTML = '';

  for (var element of aData) {
    document.getElementById('username').innerHTML = "Hallo " + element.Vorname + " !"
    document.getElementById('KdNr').innerHTML = "Kundennummer: " + element.KundenNr
    dataHTML += `<tr><td>${element.Adresse}</td><td>${element.Vorname}</td><td>${element.Nachname}</td>
          <td>${element.Geb}</td><td>${element.Straße}</td> <td>${element.HausNr}</td>
          <td>${element.Plz}</td><td>${element.Ort}</td><td>${element.Telefon}
          </td>
            <td> <button1  class="btn btn-success" type="button" class="btn btn-secondary  px-3">anlegen</button1>
          </td>
            <td> <button2  type="button" class="btn btn-primary  px-3"><i class="fas fa-edit" aria-hidden="true"></i></button2>
          </td>`

  }

  tableBody.innerHTML = dataHTML;


}

function navtoLogin() {
  location.href = '../views/Login.html'
}
function onPressImg() {
  location.href = '../views/home.html'
}

$(document).on("click", "button2", function () {
  let tr = $(this).closest('tr');
  var oKundenNr = JSON.parse(sessionStorage.getItem('KundenInfo'))[0]

  obj = {
    Straße: tr[0].cells[4].textContent,
    HausNr: tr[0].cells[5].textContent,
    Plz: Number(tr[0].cells[6].textContent),
    Ort: tr[0].cells[7].textContent,
    Nachname: tr[0].cells[2].textContent,
    KundenNr: oKundenNr.KundenNr,
    Geb: tr[0].cells[3].textContent,
    Vorname: tr[0].cells[1].textContent,
    Telefon: Number(tr[0].cells[8].textContent),
    Adresse: Number(tr[0].cells[0].textContent)


  }
  Adresse = obj.Adresse;
  Nachname_ = obj.Nachname;
  Straße_ = obj.Straße;
  Hausnummer_ = obj.HausNr;
  plz_ = obj.Plz;
  Ort_ = obj.Ort;
  Telefonummer_ = obj.Telefon;
  Kundennummer_ = obj.KundenNr;
  Vorname_ = obj.Vorname
  Geb_ = obj.Geb

  sessionStorage.setItem('clickedData', JSON.stringify(obj))

  var modalWrap = null;
  if (modalWrap != null) {
    modalWrap.remove();
  }
  var oData = JSON.parse(sessionStorage.getItem('clickedData'))
  if (oData != null) {
    modalWrap = document.createElement('div')
    modalWrap.innerHTML = `
          <div class="modal fade" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header" bg-light>
                      <div>
                        <h5 class="modal-title">Daten bearbeiten</h5>
                        <h8 id="Adresse"> Adresse : ${obj.Adresse} </h8>
                        </div>
                      <span aria-hidden="true">&times;</span>
                      </div>
                    <div class="modal-body">
                 
                    <div class="form-group">
                    <label for="exampleInputEmail1">Vorname:</label>
                    <input type="text" class="form-control" id="ip0" aria-describedby="emailHelp"  value="${oData.Vorname}" readonly>
                    </div>
  
                    <div class="form-group">
                    <label for="exampleInputPassword1">Nachname:</label>
                    <input oninput="Nachname(this)"  type="text" class="form-control" id="ip1" value="${obj.Nachname}">
                    </div>
  
                    <div class="form-group">
                    <label for="exampleInputPassword1">Geburtstdatum:</label>
                    <input type="text" class="form-control" id="ip2" value="${obj.Geb}" readonly>
                    </div>
  
                    <div class="form-group">
                    <label for="exampleInputPassword1">Straße:</label>
                    <input oninput="Straße(this)"  type="text" class="form-control" id="ip3" value="${obj.Straße}">
                    </div>
  
                    <div class="form-group">
                    <label for="exampleInputPassword1">Hausnummer:</label>
                    <input oninput="HausNr(this)" type="text" class="form-control" id="ip4" value="${obj.HausNr}">
                    </div>
  
                    <div class="form-group">
                    <label for="exampleInputPassword1">PLZ:</label>
                    <input oninput="Plz(this)" type="text" class="form-control" id="ip5" value="${obj.Plz}" >
                    </div>
  
                   <div class="form-group">
                   <label for="exampleInputPassword1">Ort:</label>
                   <input oninput="Ort(this)" type="text" class="form-control" id="ip6" value="${obj.Ort}">
                   </div>
  
                   <div class="form-group">
                   <label for="exampleInputPassword1">Telefonnummer:</label>
                   <input oninput="Tel(this)" type="text" class="form-control" id="ip7" value="${obj.Telefon}">
                   </div>
              </div>
           <div class="modal-footer" bg-light>
              <button type="button" onclick="onSave()" class="btn btn-primary">Speichern</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           </div>
          </div>
        </div>
      </div>
        `;
    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
    document.querySelector(".modal").addEventListener("click", function () {
      document.querySelector(".modal fade").style.display = "none";
    })

  }

})




$(document).on("click", "button1", function () {

  let tr = $(this).closest('tr');
  var oKundenNr = JSON.parse(sessionStorage.getItem('KundenInfo'))[0]

  obj = {
    Straße: tr[0].cells[4].textContent,
    HausNr: tr[0].cells[5].textContent,
    Plz: Number(tr[0].cells[6].textContent),
    Ort: tr[0].cells[7].textContent,
    Nachname: tr[0].cells[2].textContent,
    KundenNr: oKundenNr.KundenNr,
    Geb: tr[0].cells[3].textContent,
    Vorname: tr[0].cells[1].textContent,
    Telefon: Number(tr[0].cells[8].textContent),
    Adresse: Number(tr[0].cells[0].textContent)

  }
  sessionStorage.setItem('clickedData', JSON.stringify(obj))

  var modalWrap = null;
  if (modalWrap != null) {
    modalWrap.remove();
  }

  modalWrap = document.createElement('div')
  modalWrap.innerHTML = `
            <div class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                      <div class="modal-content">
                      <div class="modal-header">
                        <div class="div" width="200px">
                          <h3 class="modal-title">Wasserstand anlegen für: </h3>
                          <p class="modal-title2">${obj.Straße} ${obj.HausNr}</p>
                        </div>
                        </div>
                      <div class="modal-body">
                      <form>
                      <div class="form-group row">
                        <div class="col-xs-4">
                          <input oninput="maxLengthCheck1(this)" class="ip1" type="number" id="ipp1" name="username" maxlength="1" max="9" min="0" value="0">
                          <input oninput="maxLengthCheck2(this)" class="ip1" type="number" id="ip2" name="username" maxlength="1" max="9" min="0" value="0">
                          <input oninput="maxLengthCheck3(this)" class="ip1" type="number" id="ip3" name="username" maxlength="1" max="9" min="0" value="0">
                          <input oninput="maxLengthCheck4(this)" class="ip1" type="number" id="ip4" name="username" maxlength="1" max="9" min="0" value="0">
                          <input oninput="maxLengthCheck5(this)" class="ip1" type="number" id="ip5" name="username" maxlength="1" max="9" min="0" value="0">
                          <h7> ,</h7>
                          <input oninput="maxLengthCheck6(this)" class="ip2" type="number" id="ip6" name="username" maxlength="1" max="9" min="0" value="0">
                          <input oninput="maxLengthCheck7(this)" class="ip2" type="number" id="ip7" name="username" maxlength="1" max="9" min="0" value="0">
                          <input oninput="maxLengthCheck8(this)" class="ip2" type="number" id="ip8" name="username" maxlength="1" max="9" min="0" value="0">
                        m<sup>3</sup>
                        </div>
                      </div>
                    </form>
                </div>
             <div class="modal-footer">
                <button onclick="save()" type="button" class="btn btn-primary">Speichern</button>
                <button onclick="close()" type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
             </div>
            </div>
          </div>
        </div>
          `;
  document.body.append(modalWrap);
  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
  document.querySelector(".modal").addEventListener("click", function () {
    document.querySelector(".modal fade").style.display = "none";
  })

})

function onPressImg() {
  location.href = "../views/home.html"
}

function maxLengthCheck1(e) {
  if (e.value === "0") {
    value1 = 0
  } else {
    value1 = e.value
  }


}
function maxLengthCheck2(e) {
  if (e.value === "0") {
    value2 = 0
  } else {
    value2 = e.value
  }

}
function maxLengthCheck3(e) {
  if (e.value === "0") {
    value3 = 0
  } else {
    value3 = e.value
  }


}
function maxLengthCheck4(e) {
  if (e.value === "0") {
    value4 = 0
  } else {
    value4 = e.value
  }


}
function maxLengthCheck5(e) {
  if (e.value === "0") {
    value5 = 0
  } else {
    value5 = e.value
  }


}
function maxLengthCheck6(e) {
  if (e.value === "0") {
    value6 = 0
  } else {
    value6 = e.value
  }


}
function maxLengthCheck7(e) {
  if (e.value === "0") {
    value7 = 0
  } else {
    value7 = e.value
  }


}
function maxLengthCheck8(e) {
  if (e.value === "0") {
    value8 = 0
  } else {
    value8 = e.value
  }

}

function wasserstand() {
  var ergebnis = value1 + "" + value2 + "" + value3 + "" + value4 + "" + value5 + "" + value6 + "" + value7 + "" + value8;
  return ergebnis
}

function save() {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '.' + mm + '.' + yyyy;

  var oData = JSON.parse(sessionStorage.getItem('clickedData'))
  if (wasserstand() != 'undefinedundefinedundefinedundefinedundefinedundefinedundefinedundefined') {
    oData.wasserstand = wasserstand()
    oData.Datum = String(today);

    fetch('http://localhost:4000/waterlevel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(oData)
    }).then((res) => {
      console.log(res)
    })
  } else {
    alert("Bitte geben Sie vor dem absenden Ihren Wasserstand ein")
  }

}

function Nachname(e) {
  if (e != undefined) {
    Nachname_ = e.value
    return Nachname_
  } else {
    return Nachname_
  }

}
function Straße(e) {
  if (e != undefined) {
    Straße_ = e.value
    return Straße_
  } else {
    return Straße_
  }


}
function HausNr(e) {
  if (e != undefined) {
    Hausnummer_ = e.value
    return Hausnummer_
  } else {
    return Hausnummer_
  }


}
function Plz(e) {
  if (e != undefined) {
    plz_ = e.value
    return plz_
  } else {
    return plz_
  }



}
function Ort(e) {
  if (e != undefined) {
    Ort_ = e.value
    return Ort_
  } else {
    return Ort_
  }


}
function Tel(e) {
  if (e != undefined) {
    Telefonummer_ = e.value
    return Telefonummer_
  } else {
    return Telefonummer_
  }


}



function onSave() {

  // var Vorname = document.getElementById('ip0').value;
  // console.log(Vorname)
  // console.log(Nachname())
  // var Geb = document.getElementById('ip2').value;
  // console.log(Geb)
  // console.log(Straße())
  // console.log(HausNr())
  // console.log(Plz())
  // console.log(Ort())
  // console.log(Tel())
  // console.log(Adresse)



  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = String(dd + '.' + mm + '.' + yyyy);

  var oData = {Vorname: Vorname_, Nachname: Nachname(), KundenNr: Kundennummer_, Geb: Geb_, Straße: Straße(), Hausnummer: HausNr(),
  Plz: Plz(), Ort: Ort(), Telefon: Tel(), Adresse: Adresse, Datum: today}

  fetch('http://localhost:4000/editedUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(oData)
  }).then((res) => {
    console.log(res)
  })

}


