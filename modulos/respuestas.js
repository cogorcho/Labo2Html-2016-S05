var fs = require('fs');
var http = require('http');
var db = require('./sql.js');

var enviar = function(res,params) {
	var opar = JSON.parse(params.replace(/\%22/g,'\"'));
	var respuestas = JSON.stringify(traer(opar.categoriaid, opar.areaid, opar.preguntaid));
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(respuestas);
}

var create =  function() {
	var cfile = process.cwd() + '/database/schema/create/respuestas.sql';
	var csql = fs.readFileSync(cfile,'utf8');
	db.execute(csql);
}

var drop = function() {
	var dfile = process.cwd() + '/database/schema/drop/respuestas.sql';
	var dsql = fs.readFileSync(cfile,'utf8');
	db.execute(dql);
}

var insertRow = function(id,descripcion) {
	var ifile = process.cwd() + '/database/schema/insert/respuestas.sql';
	var isql = fs.readFileSync(ifile,'utf8');
	db.execute(isql,[id, descripcion]);
}

var deleteRow = function(id) {
	var dfile = process.cwd() + '/database/schema/delete/respuestas.sql';
	var dsql = fs.readFileSync(dfile,'utf8');
	db.execute(dsql,[id]);
}

var insertarTodas = function() {
	var data = JSON.parse(respuestas);
	var cuantas = data.length;
	for (var i = 0; i < cuantas; i++ ) {
		insertRow(data[i].id, data[i].descripcion);
	}
}

var traer = function(categoriaid, areaid, preguntaid) {
	var sfile = process.cwd() + '/database/schema/select/respuestasById.sql';
	var ssql = fs.readFileSync(sfile,'utf8');
	return db.select(ssql,[categoriaid, areaid, preguntaid]);
}

exports.enviar = enviar;
exports.create = create;
exports.drop = drop;
exports.insertRow = insertRow;
exports.deleteRow = deleteRow;
exports.insertarTodas = insertarTodas;
exports.traer = traer;
