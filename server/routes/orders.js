const express = require('express');
const router = express.Router();
const db = require('../db');

//get all records
router.get('/', (req, res, next) => {
	let sql = `SELECT * FROM orders`;
	db.query(sql, (err, results) => {
		if (err) console.log('sql error');
		res.json(results);
	});
});

//get one record
router.get('/:order_id', (req, res, next) => {
	let sql = `SELECT * FROM orders WHERE order_id = ?`;
	db.query(sql, [req.params.order_id], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

//Create
router.post('/', (req, res, next) => {
	let newRecord = req.body; //the data will be send through the body
	let sql = `INSERT INTO orders SET ?`;
	db.query(sql, newRecord, (err, results) => {
		if (err) throw err;
		res.json(results); //server response
	});
});

//YOU CANNOT UPDATE AN ORDER
// //update a row
// router.put('/:order_id', (req, res) => {
// 	let sql =
// 		'UPDATE orders SET `order_details_id `=?, `unit_price`=?  WHERE order_id=?';
// 	db.query(
// 		sql,
// 		[req.body.order_id, req.body.unit_price, req.params.order_id],
// 		//QUESTION how do I update select columns in a row?
// 		(err, results) => {
// 			if (err) throw err;
// 			res.json(results);
// 		}
// 	);
// });

router.delete('/:order_id', (req, res) => {
	let sql = 'DELETE FROM orders WHERE order_id = ?';
	db.query(sql, [req.params.order_id], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

module.exports = router;
