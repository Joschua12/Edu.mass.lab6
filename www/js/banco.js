var usuario = null;

var desenhaMenuUsuario = function(user) {
  html = '<ul id="menu-usuario" class="nav navbar-nav navbar-right">';
  html += '<li class="dropdown">';
  html += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="fa fa-user"></i> Usuário<span class="caret"></span></a>'
  html += '<ul class="dropdown-menu">';
  html += '<li><a href="#" id="sair">Sair</a></li>'
  html += '</ul>';
  html += '</li>';
  html += '</ul>';
  return html;
};

var desenhaMenuLogin = function() {
  html = '<ul id="menu-login" class="nav navbar-nav navbar-right">' +
    '<li class="dropdown">' +
      '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Logar <span class="caret"></span></a>' +
      '<ul id="login-dp" class="dropdown-menu">' +
        '<li>' +
          '<div class="row">' +
            '<div class="col-md-12">' +
              'Login via' +
              '<div class="social-buttons">' +
                '<a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>' +
                '<a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>' +
              '</div>' +
              'or' +
              '<form id="login-nav">' +
                '<div class="form-group">' +
                  '<label class="sr-only" for="email-login">Email</label>' +
                  '<input type="email" class="form-control" id="email-login" placeholder="Email" required>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label class="sr-only" for="senha-login">Senha</label>' +
                  '<input type="password" class="form-control" id="senha-login" placeholder="Senha" required>' +
                  '<div class="help-block text-right"><a href="">Forget the password ?</a></div>' +
                '</div>' +
                '<div class="form-group">' +
                  '<button type="button" id="bt-login" class="btn btn-primary btn-block">Entrar</button>' +
                '</div>' +
                '<div class="checkbox">' +
                  '<label>' +
                    '<input type="checkbox"> keep me logged-in' +
                  '</label>' +
                '</div>' +
              '</form>' +
            '</div>' +
            '<div class="bottom text-center">' +
              'New here ? <a href="#" id="joinus"><b>Join Us</b></a>' +
            '</div>' +
          '</div>' +
        '</li>' +
      '</ul>' +
    '</li>' +
  '</ul>';
  return html;
};

var paginaInicial = function() {
  $('#conteudo').load('inicial.html');
};

var limparPaginaInicial = function() {
  $('#conteudo').html('');
};

$(document).ready(function(){
  u = Cookies.get('usuario');
  console.log(firebase.auth().currentUser);
  if (u) {
    usuario = JSON.parse(u);
    $('#menu-login').remove();
    $('#menu-principal').append(desenhaMenuUsuario(usuario));
    paginaInicial();
  } else {
    $('#menu-usuario').remove();
    $('#menu-principal').append(desenhaMenuLogin());
    limparPaginaInicial();
  }

  $(document).on('click', '#sair', function() {
    firebase.auth().signOut()
    .then(function() {
        Cookies.remove('usuario');
        $('#menu-usuario').remove();
        $('#menu-principal').append(desenhaMenuLogin());
        limparPaginaInicial();
    })
    .catch(function(error) {
      console.log('deu errado');
    });
  });

  $(document).on('click', '#login-novo', function(){
    var email = $('#email-novo').val();
    var password = $('#senha-novo').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
        Cookies.set('usuario', user);
        $('#modal-join').modal('hide');
        $('#menu-login').remove();
        $('#menu-principal').append(desenhaMenuUsuario(user));
        paginaInicial();
    })
    .catch(function(error) {
      console.log("Errrrrooooouuuu!!!");
      console.log("Erro: " + error.message);
    });
  });

  $(document).on('click', '#bt-login', function(){
    var email = $('#email-login').val();
    var password = $('#senha-login').val();

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(user) {
      Cookies.set('usuario', user);
      $('#menu-login').remove();
      $('#menu-principal').append(desenhaMenuUsuario(user));
      paginaInicial();
    })
    .catch(function(error) {
      console.log("Errrrrooooouuuu!!! 2");
      console.log("Erro: " + error.message);
    });
  });

  $(document).on('click', '#joinus', function() {
    $('#modal-join').modal('show');
  });
});
