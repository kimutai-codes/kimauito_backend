const express = require('express');
const router = express.Router();
const db = require('../db');

//get all records
router.get('/', (req, res, next) => {
	let sql = `SELECT * FROM order_details`;
	db.query(sql, (err, results) => {
		if (err) console.log('sql error');
		res.json(results);
	});
});

//get one record
router.get('/:order_details_id', (req, res, next) => {
	let sql = `SELECT * FROM order_details WHERE order_details_id = ?`;
	db.query(sql, [req.params.order_details_id], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

//Create
router.post('/', (req, res, next) => {
	let newRecord = req.body; //the data will be send through the body
	let sql = `INSERT INTO order_details SET ?`;
	db.query(sql, newRecord, (err, results) => {
		if (err) throw err;
		res.json(results); //server response
	});
});

//update a row
router.put('/:order_details_id', (req, res) => {
	let sql =
		'UPDATE order_details SET `product_name`=?, `quantity`=?  WHERE order_details_id=?';
	db.query(
		sql,
		[req.body.product_name, req.body.quantity, req.params.order_details_id],
		//QUESTION how do I update select columns in a row?
		(err, results) => {
			if (err) throw err;
			res.json(results);
		}
	);
});

//cannot delete as it is used in orders table and in inventory table as well
router.delete('/:order_details_id', (req, res) => {
	let sql = 'DELETE FROM order_details WHERE order_details_id = ?';
	db.query(sql, [req.params.order_details_id], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

module.exports = router;
