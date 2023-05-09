var express = require('express')
var cors = require('cors')
require('dotenv').config()

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

var app = express()
app.use(cors())
app.use(express.json())

app.get('/employee', function (req, res, next) {
  connection.query(
    'SELECT * FROM `employee`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/employee/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `employee` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/employee', function (req, res, next) {
  connection.query(
    'INSERT INTO `employee`(`fname`, `lname`, `idcard`, `username`, `password`, `email`, `avatar`) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.body.fname, req.body.lname, req.body.idcard, req.body.username, req.body.password, req.body.email, req.body.avatar],
    function(err, results) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add employee' });
        return;
      }
      res.json(results);
    }
  );
});

app.put('/employee/:id', function (req, res, next) {
  connection.query(
    'UPDATE `employee` SET `fname`= ?, `lname`= ?, `idcard`= ?, `username`= ?, `password`= ?, `email`= ?, `avatar`= ? WHERE id = ?',
    [req.body.fname, req.body.lname, req.body.idcard, req.body.username, req.body.password, req.body.email, req.body.avatar, req.params.id],
    function(err, results) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(results);
      }
    }
  );
});

app.delete('/employee', function (req, res, next) {
  connection.query(
    'DELETE FROM `employee` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})