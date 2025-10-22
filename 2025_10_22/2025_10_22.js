const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.type('text/plain; charset=utf-8').send('Strona główna');
});

app.get('/json', (req, res) => {
    const obj = { name: "Dominik", age: 17, gender: "Male" };
    res.json(obj);
});

app.get('/html', (req, res) => {
    res.type('text/html; charset=utf-8').send(`
    <h1>HTML!</h1>
    <div>hjdyhdduddhdhdh</div>
    <h1>HTML!</h1>
  `);
});

app.get('/htmlFile', (req, res) => {
    const filePath = path.join(__dirname, 'myfile.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        res.type('text/html; charset=utf-8').send(data);
    });
});

app.get('/get_params', (req, res) => {
    console.log(JSON.stringify(req.query, null, 2));
    const fileName = `params_${Date.now()}.json`;
    fs.writeFile(fileName, JSON.stringify(req.query, null, 2), (err) => {
        if (err) {
            console.error('Wystąpił błąd podczas zapisu', err);
            return res.status(500).json({ error: 'Błąd zapisu pliku' });
        }
        console.log('Dane zostały zapisane');
        res.json({ ok: 'ok' });
    });
});

app.use(express.static(path.join(__dirname, 'assets')));
app.all('*',(req, res) => {
    res.status(404)
    res.send({ error: "Not Found" });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
