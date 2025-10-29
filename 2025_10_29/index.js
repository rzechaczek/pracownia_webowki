const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const port = 3000;
const app = express()
app.use("/static", express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));


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
  res.redirect("/");
});

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})


