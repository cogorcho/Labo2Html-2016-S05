var http = require('http');
var fs = require('fs');
var url = require("url");

var index = require('./index.js');
var categorias = require('./categorias.js');
var areas = require('./areas.js');
var preguntas = require('./preguntas.js');
var respuestas = require('./respuestas.js');
var codigoq = require('./codigoq.js');
var notfound = require('./notfound.js');
var js = require('./js.js');
var css = require('./css.js');
var cssmap = require('./cssmap.js');

var route = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var params = url.parse(req.url).query;

  switch (pathname) {
      case '/' : {
        index.enviar(res); break;
      }
      case '/categorias' : {
        categorias.enviar(res); break;
      }
      case '/areas' : {
        areas.enviar(res); break;
      }
      case '/preguntas' : {
        preguntas.enviar(res, params); break;
      }
      case '/respuestas' : {
        respuestas.enviar(res, params); break;
      }
      case '/codigoq' : {
        codigoq.enviar(res); break;
      }
      case '/js/cliente.js' : {
        js.enviar(res); break;
      }
      case '/css/bootstrap/css/bootstrap.min.css' : {
        css.enviar(res); break;
      }
      case '/css/bootstrap/css/bootstrap.min.css.map' : {
        cssmap.enviar(res); break;
      }
      default : { 
        console.log('Recibido: ' + pathname + '. Requerimiento invalido');
        notfound.enviar(res);
        // res.writeHead(404, {'Content-Type': 'text/html'});
        // res.end();
        break;
      }
  }
}

exports.route = route;
