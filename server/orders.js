const express = require('express');
const router = express.Router();
const db = require('../db');

//get all records
router.get('/', (req, res, next) => {
	let sql = `SELECT * FROM products`;
	db.query(sql, (err, results) => {
		if (err) console.log('sql error');
		res.json(results);
	});
});

//get one record
router.get('/:product_name', (req, res, next) => {
	let sql = `SELECT * FROM products WHERE product_name = ?`;
	db.query(sql, [req.params.product_name], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

//Create
router.post('/', (req, res, next) => {
	let newRecord = req.body; //the data will be send through the body
	let sql = `INSERT INTO products SET ?`;
	db.query(sql, newRecord, (err, results) => {
		if (err) throw err;
		res.json(results); //server response
	});
});

//update a row
router.put('/:product_name', (req, res) => {
	let sql =
		'UPDATE products SET `product_name`=?, `unit_price`=?  WHERE product_name=?';
	db.query(
		sql,
		[req.body.product_name, req.body.unit_price, req.params.product_name],
		//QUESTION how do I update select columns in a row?
		(err, results) => {
			if (err) throw err;
			res.json(results);
		}
	);
});

router.delete('/:product_name', (req, res) => {
	let sql = 'DELETE FROM products WHERE product_name = ?';
	db.query(sql, [req.params.product_name], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

module.exports = router;
