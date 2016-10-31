var sqlite = require('sqlite-sync'); //requiring 
var fs = require('fs');

var rootDir = process.cwd();
var dbfile = rootDir + '/database/lu.db';

//Connecting - if the file does not exist it will be created 
sqlite.connect(dbfile); 

var select = function(sql,pars) {
	var data = sqlite.run(sql, pars);
	return data;
}

var execute = function(sql,pars) {
	sqlite.run(sql, pars);
}

exports.dbfile = dbfile;
exports.execute = execute;
exports.select = select;
