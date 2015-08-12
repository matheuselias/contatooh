var express = require('express');
var load = require('express-load');
var bodyPaser = require('body-parser');

module.exports = function(){
  var app = express();

  // configuração de ambiente
  app.set('port', 3000);

  // middleware
  app.use(express.static('./public'));
  app.set('view engine', 'ejs');
  app.set('views', './app/views');
  app.use(bodyPaser.urlencoded({extended: true}));
  app.use(bodyPaser.json());
  app.use(require('method-override')());
  load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
