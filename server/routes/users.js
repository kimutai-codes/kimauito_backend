const express = require('express');
const router = express.Router(); //create router
const db = require('../db');

//get all users
router.get('/', (req, res, next) => {
	let sql = `SELECT * FROM users`;
	db.query(sql, (err, results) => {
		if (err) console.log('sql error');
		res.json(results);
	});
});

// get one use by id
router.get('/:id', (req, res, next) => {
	let sql = `SELECT * FROM users WHERE user_id = ?`;
	db.query(sql, [req.params.id], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

//add user
//TODO this should be restricted to the admin alone
router.post('/', (req, res, next) => {
	let newUser = req.body; //the data will be send through the body
	let sql = `INSERT INTO users SET ?`;
	db.query(sql, newUser, (err, results) => {
		if (err) throw err;
		res.json(results); //server response
	});
});

//update user
//TODO this should be restricted to the admin alone
router.put('/:id', (req, res) => {
	let sql =
		'UPDATE users SET `first_name`=?, `second_name`=?, `user_phone`=?, `user_email`=?, `password`=?, `user_role`=? WHERE user_id=?';
	db.query(
		sql,
		[
			req.body.first_name,
			req.body.second_name,
			req.body.user_phone,
			req.body.user_email,
			req.body.password,
			req.body.user_role,
			req.params.id,
		],
		(err, results) => {
			if (err) throw err;
			res.json(results);
		}
	);
});

// delete user
//TODO this should be restricted to the admin alone
router.delete('/:id', (req, res) => {
	let sql = 'DELETE FROM users WHERE user_id = ?';
	db.query(sql, [req.params.id], (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

//TODO
// login logic

module.exports = router;
