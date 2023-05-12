var express = require('express')
var cors = require('cors')
require('dotenv').config()

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
const jwt = require('jsonwebtoken');
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
      res.json({ message: 'Employee Create successfully' });
    }
  );
});

app.put('/employee/update', function (req, res, next) {
  connection.query(
    'UPDATE `employee` SET `fname`= ?, `lname`= ?, `idcard`= ?, `username`= ?, `password`= ?, `email`= ?, `avatar`= ? WHERE id = ?',
    [req.body.fname, req.body.lname, req.body.idcard, req.body.username, req.body.password, req.body.email, req.body.avatar, req.body.id],
    function(err, results) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ message: 'Update Employee successfully' });
      }
    }
  );
});

app.delete('/employee/delete', function (req, res, next) {
  connection.query(
    'DELETE FROM `employee` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ message: 'Delete Employee successfully' });
      }
    }
  );
})

app.get('/post', function (req, res, next) {
  connection.query(
    'SELECT * FROM `post`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/post/desc', function (req, res, next) {
  connection.query(
    'SELECT * FROM `post` ORDER BY id DESC',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/post/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `post` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/post', function (req, res, next) {
  connection.query(
    'INSERT INTO `post`(`users`, `topic`, `typelift`, `description`, `image`) VALUES (?, ?, ?, ?, ?)',
    [req.body.users, req.body.topic, req.body.typelift, req.body.description, req.body.image.join(',')],
    function(err, results) {
      if (err) {
        res.status(500).json({ error: 'Failed to add post' });
      }
      else {
      res.json({ message: 'Create Post successfully' });
    }
    }
  );
});


app.put('/post/update', function (req, res, next) {
  connection.query(
    'UPDATE `post` SET `users`= ?, `topic`= ?, `typelift`= ?, `description`= ?, `image`= ? WHERE id = ?',
    [req.body.users, req.body.topic, req.body.typelift, req.body.description, req.body.image, req.body.id],
    function(err, results) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ message: 'Update post successfully' });
      }
    }
  );
});

app.delete('/post/delete', function (req, res, next) {
  connection.query(
    'DELETE FROM `post` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ message: 'Delete post successfully' });
      }
    }
  );
})

app.post('/login', function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    'SELECT * FROM employee WHERE username = ? AND password = ?',
    [username, password],
    function(err, results) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }

      const token = jwt.sign({ username }, 'secret_key');


      res.json({ message: 'Login successful', token });
    }
  );
});


app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})