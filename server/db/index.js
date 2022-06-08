const mysql = require('mysql');

const connection = mysql.createPool({
	host: 'localhost',
	user: 'kimauito',
	password: 'kimauito',
	database: 'agrovet_db',
	connectionLimit: 10,
});

connection.getConnection((err) => {
	if (err) throw err;
	console.log('db connected');
});

module.exports = connection;