var express = require('express')
var cors = require('cors')
require('dotenv').config()
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL)

var app = express()
app.use(cors())
app.use(express.json())

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})