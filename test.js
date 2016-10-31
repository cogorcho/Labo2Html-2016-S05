var  c = require('./modulos/categorias.js');
var  a = require('./modulos/areas.js');
var  p = require('./modulos/preguntas.js');
var  r = require('./modulos/respuestas.js');

var catid = process.argv[2];
var areaid = process.argv[3];
var pregid = process.argv[4];
//console.log(catid,areaid,pregid);

//c.create();
//c.drop();
//c.insertRow(1,'Novicio');
//c.deleteRow(1);
//c.insertarTodas();
var cats = c.traer();
console.log(typeof cats);
console.log(cats.length);
console.log(JSON.stringify(cats));
// console.log(c.traerUna(3));

//a.create();
//a.drop();
//a.insertarTodas();
//a.traer();
//a.traerUna(2);
//console.log(a.traer());
//console.log(a.traerUna(1));

//p.create();
//p.drop();
//p.insertarTodas();
//console.log(p.traer(1,1));
// console.log(p.traerUna(catid,areaid,pregid));
// console.log(r.traer(catid,areaid,pregid));
// console.log(p.correcta(catid,areaid,pregid));

//r.create();
//r.drop();
//r.insertarTodas();
//console.log(r.traer(1,1,111));
