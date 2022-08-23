function navtoLogin(){
    location.href = '../views/Login.html'
  }
  window.onload = () => {

    var arr = JSON.parse(sessionStorage.getItem("today"))
arr.pop()
    

    modalWrap = document.createElement('div')
    modalWrap.innerHTML = `
            <div class="modal fade" tabindex="-1" role="dialog" id="onClose">
                <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header" bg-light>
                        <h2 class="modal-title">Ihre Letzte Anmeldung auf der Seite war am ${arr[arr.length-1] } </h2>
                        <i class="fa fa-exclamation-circle fa-2x" style="color:#ffae42"></i>
                        </div>
                      <div class="list-group">
                </div>
             <div class="modal-footer" bg-light>
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
  for (var element of JSON.parse(sessionStorage.getItem('KundenInfo'))){

    var test = document.getElementById('username')
    document.getElementById('KdNr').innerHTML = "Kundennummer: " + element.KundenNr
    test.innerHTML = "Hallo " +  element.Vorname + " !"
  }

  }
