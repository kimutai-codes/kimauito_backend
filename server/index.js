const express = require('express'); //import express
const bodyParser = require('body-parser');

const app = express(); //initialize the server
app.use(express.json()); //parse to json
app.use(express.urlencoded({ extended: true }));

//router routes
const usersRoute = require('./routes/users');
const supplierRoute = require('./routes/suppliers');
//API routes
app.use('/api/users', usersRoute); //we put the route in /api/users
app.use('/api/suppliers', supplierRoute); 
app.use('/api/products', require('./routes/products'));

//port to run app
app.listen(process.env.PORT || '3000', () => {
	console.log(
		`server is up and runing on port: ${process.env.PORT || '3000'}`
	);
});
