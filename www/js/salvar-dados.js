var fireBaseRef = firebase.database().ref();
var salvarEquipamento = function() {
  var id = $('#id-novo').val();
  var nome = $('#nome-novo').val();

  fireBaseRef.push({id: id, nome: nome}, function(error){
    console.log('deu merda');
  });


};

$(document).ready(function(){
  $(document).on('click', '#salvar-novo', function(){
    salvarEquipamento();
  });
});
