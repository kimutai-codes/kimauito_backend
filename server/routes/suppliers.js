const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
	let sql = `SELECT * FROM suppliers`;
	db.query(sql, (err, results) => {
		if (err) console.log('sql error');
		res.json(results);
	});
});

router.get('/:supplier_name', (req, res, next) => {
	let sql = `SELECT * FROM suppliers WHERE supplier_name = ?`;
	db.query(sql, [req.params.supplier_name], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

//Create
router.post('/', (req, res, next) => {
	let newUser = req.body; //the data will be send through the body
	let sql = `INSERT INTO suppliers SET ?`;
	db.query(sql, newUser, (err, results) => {
		if (err) throw err;
		res.json(results); //server response
	});
});

//update a row
router.put('/:supplier_name', (req, res) => {
	let sql =
		'UPDATE suppliers SET `supplier_phone`=?, `supplier_email`=?  WHERE supplier_name=?';
	db.query(
		sql,
		[
			req.body.supplier_phone,
			req.body.supplier_email,
			req.params.supplier_name,
		],
		(err, results) => {
			if (err) throw err;
			res.json(results);
		}
	);
});

//cannot be deleted because we need to have that datat in the inventory!!
router.delete('/:supplier_name', (req, res) => {
	let sql = 'DELETE FROM suppliers WHERE supplier_name = ?';
	db.query(sql, [req.params.supplier_name], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

module.exports = router;
