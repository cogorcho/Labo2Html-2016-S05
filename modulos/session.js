var crypto = require('crypto');

var session = {
	user: null,
	password: null,
	token: crypto.randomBytes(64).toString('hex')
}

exports.session = session;