var fs = require('fs');
var http = require('http');
var db = require('./sql.js');

var enviar = function(res) {
	var areas = JSON.stringify(traer());
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(areas);
}

var create =  function() {
	var cfile = process.cwd() + '/database/schema/create/areas.sql';
	var csql = fs.readFileSync(cfile,'utf8');
	db.execute(csql);
}

var drop = function() {
	var dfile = process.cwd() + '/database/schema/drop/areas.sql';
	var dsql = fs.readFileSync(cfile,'utf8');
	db.execute(dql);
}

var insertRow = function(id,descripcion) {
	var ifile = process.cwd() + '/database/schema/insert/areas.sql';
	var isql = fs.readFileSync(ifile,'utf8');
	db.execute(isql,[id, descripcion]);
}

var deleteRow = function(id) {
	var dfile = process.cwd() + '/database/schema/delete/areas.sql';
	var dsql = fs.readFileSync(dfile,'utf8');
	db.execute(dsql,[id]);
}

var insertarTodas = function() {
	var data = JSON.parse(areas);
	var cuantas = data.length;
	for (var i = 0; i < cuantas; i++ ) {
		insertRow(data[i].id, data[i].descripcion);
	}
}

var traer = function() {
	var sfile = process.cwd() + '/database/schema/select/areas.sql';
	var ssql = fs.readFileSync(sfile,'utf8');
	return db.select(ssql);
}

var traerUna = function(id) {
	var sfile = process.cwd() + '/database/schema/select/areaById.sql';
	var ssql = fs.readFileSync(sfile,'utf8');
	return db.select(ssql,[id]);
}


exports.enviar = enviar;
exports.create = create;
exports.drop = drop;
exports.insertRow = insertRow;
exports.deleteRow = deleteRow;
exports.insertarTodas = insertarTodas;
exports.traer = traer;
exports.traerUna = traerUna;
