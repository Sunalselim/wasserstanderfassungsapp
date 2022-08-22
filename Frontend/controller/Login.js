
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
      today()
    } else {
     console.log("Kundennummer nicht gefunden")
     document.getElementById("Kundennummer").className = 'form-control is-invalid'
     document.getElementById("passwordHelp").className = 'text-danger'
    }
  })



}
var array = []
function today (){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  today = dd + '.' + mm + '.' + yyyy + " " +  time
  
  array.push(today)
  sessionStorage.setItem("today", JSON.stringify(array))
  
}


