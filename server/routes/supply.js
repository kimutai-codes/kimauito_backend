const express = require('express');
const router = express.Router();
const db = require('../db');

//get all records
router.get('/', (req, res, next) => {
	let sql = `SELECT * FROM supply`;
	db.query(sql, (err, results) => {
		if (err) console.log('sql error');
		res.json(results);
	});
});

//get one record
router.get('/:supply_id', (req, res, next) => {
	let sql = `SELECT * FROM supply WHERE supply_id = ?`;
	db.query(sql, [req.params.supply_id], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

//Create
router.post('/', (req, res, next) => {
	let newRecord = req.body; //the data will be send through the body
	let sql = `INSERT INTO supply SET ?`; //TODO the product mysr exist first
	db.query(sql, newRecord, (err, results) => {
		if (err) throw err;
		res.json(results); //server response
	});
});

//update a row
router.put('/:supply_id', (req, res) => {
	let sql =
		'UPDATE supply SET `product_name`=?, `units`=?, `price_per_unit`=?, `supplier_name`=?, `user_id`=? WHERE supply_id=?';
	db.query(
		sql,
		[
			req.body.product_name,
			req.body.units,
			req.body.price_per_unit,
			req.body.supplier_name,
			req.body.user_id,
			req.params.supply_id,
		],
		(err, results) => {
			if (err) throw err;
			res.json(results);
		}
	);
});

//CANNOT DELETE AS IT IS NEEDED IN THE INVENTORY TABLE
// router.delete('/:supply_id', (req, res) => {
// 	let sql = 'DELETE FROM supply WHERE supply_id = ?';
// 	db.query(sql, [req.params.supply_id], (err, results) => {
// 		if (err) throw err;
// 		res.json(results);
// 	});
// });

module.exports = router;
