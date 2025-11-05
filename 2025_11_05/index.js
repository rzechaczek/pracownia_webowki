const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const mysql = require('mysql2');
app.use("/static", express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'messages'
});

db.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err.stack);
    return;
  }
  console.log('Połączono z bazą danych');
});


app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }
    res.type('text/html; charset=utf-8').send(data);
  });
  });

app.get('/o-nas', (req, res) => {
  const filePath = path.join(__dirname, 'o_firmie.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }
    res.type('text/html; charset=utf-8').send(data);
  });
});
app.get('/oferta', (req, res) => {
  const filePath = path.join(__dirname, 'oferta.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }
    res.type('text/html; charset=utf-8').send(data);
  });
});
app.get('/kontakt', (req, res) => {
  const filePath = path.join(__dirname, 'kontakt.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }
    res.type('text/html; charset=utf-8').send(data);
  });
});

app.post("/kontakt", (req, res) => {
  console.log("Dane z formularza:");
  console.log(req.body);
  const { name, surname, email, message } = req.body;
  db.query('INSERT INTO messages (name, surname,  email, message) VALUES (?, ?, ?, ?)', [name, surname, email, message]);
  res.redirect('/');
});
app.get('/api/contact-messages' , (req, res) => {
  db.query('SELECT * FROM messages', (err, result) => {
    if (err) {
      return res.status(500).send('Error reading messages');
    }
    res.json(result);
  });
})
app.get('/api/contact-messages/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM messages WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error reading messages');
    }
    if(result.length===0){
      return res.status(404).send('Id not found');
    }
    res.json(result);
  });
})
app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})


