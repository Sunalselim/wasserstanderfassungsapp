
// function onNavToMain() {


//   var Kundennummer = Number(document.getElementById('Kundennummer').value)

//   const data = { "Kundennummer": Kundennummer };

//   fetch('http://localhost:4000/singleUser', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   }).then((res) => {
//     console.log(res)
//   })



//   location.href = "../views/main.html"


// }



function onNavToMain() {


  var Kundennummer = Number(document.getElementById('Kundennummer').value)
  
  // const data = { "Kundennummer": Kundennummer };

  fetch('http://localhost:4000/findCustomer?Kundennummer=' + Kundennummer, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then((result => result.json())).then(res => {
    console.log(res)

    if (res && Array.isArray(res) && res.length > 0) {
      //hier in session storage Kundenummer reinschreiben
      sessionStorage.setItem('KundenInfo', JSON.stringify(res))
      localStorage.setItem('KundenInfo2', JSON.stringify(res))
      location.href = "../views/home.html"
    } else {
     console.log("Kundennummer nicht gefunden")
     document.getElementById("Kundennummer").className = 'form-control is-invalid'
     document.getElementById("passwordHelp").className = 'text-danger'
    }
  })



}

