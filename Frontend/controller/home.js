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
 