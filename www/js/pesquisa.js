var nome = document.getElementById("nome");
var cidade = document.getElementById("cidade");
var mail = document.getElementById("mail");
var curso = document.getElementById("curso");
var idade = document.getElementById("idade");
var porque = document.getElementById("porque");
var enviar = document.getElementById("enviar");

function onClique(){

   var firebaseRef = firebase.database().ref();
   var dados = {"Nome":nome.value, "Cidade":cidade.value, "E-mail":mail.value, "Curso":curso.value, "Idade":idade.value, "Porque":porque.value};

   firebaseRef.push().set(dados, function(error) {
     if (!error) {
       window.location.href = 'pages/inicial.html';
     }
   });

}
