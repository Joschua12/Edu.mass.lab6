var mainText = document.getElementById("mainText");
var mainName = document.getElementById("mainName");
var mainMail = document.getElementById("mainMail");
var submitBtn = document.getElementById("submitBtn");

function submitClick(){

   var firebaseRef = firebase.database().ref();
   var dados = {"nome":mainName.value, "e-mail":mainMail.value, "Pergunta":mainText.value};

   firebaseRef.push().set(dados, function(error) {
     if (!error) {
       window.location.href = 'pages/inicial.html';
     }
   });

}
