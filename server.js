var express = require('express')
var cors = require('cors')
require('dotenv').config()

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

var app = express()
app.use(cors())
app.use(express.json())

app.get('/users', function (req, res, next) {
  connection.query(
    'SELECT * FROM `users`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/users/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `users` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})