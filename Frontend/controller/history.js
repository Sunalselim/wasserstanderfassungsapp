function navtoLogin(){
    location.href = '../views/Login.html'
  }
  window.onload = () => {
  for (var element of JSON.parse(sessionStorage.getItem('KundenInfo'))){

    var test = document.getElementById('username')
    document.getElementById('KdNr').innerHTML = "Kundennummer: " + element.KundenNr
    test.innerHTML = "Hallo " +  element.Vorname + " !"
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
        window.alert("Fehler!")
      }
    })
  
  
  
  }

  getWaterlevelsFromUser()

  function loadTable(aData) {

    const tableBody = document.getElementById('historyTable')
    let dataHTML = '';
    
  
    for (var element of aData) {
      document.getElementById('username').innerHTML = "Hallo " + element.Vorname + " !"
      document.getElementById('KdNr').innerHTML = "Kundennummer: " + element.KundenNr
      dataHTML += `<tr><td>${element.Vorname}</td><td>${element.Nachname}</td><td>${element.Geb}</td>
            <td>${element.Straße}</td><td>${element.HausNr}</td> <td>${element.Plz}</td>
            <td>${element.Ort}</td><td>${element.Telefon}</td><td>${element.Datum}</td> <td>${element.Wasserstand}</td> `
  
    }
  
    tableBody.innerHTML = dataHTML;
  
  
  }

  function onPressImg(){
    location.href = "../views/home.html"
  }

  // function myFunction() {
  //   var x = document.getElementById("mySelect").value;


  // }
 