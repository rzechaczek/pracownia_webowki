let http = require('http');
const { readFile, readFileSync} = require('fs');
const server = http.createServer(async (req, res)=> {
    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
            res.write('Strona główna');

            break;

        case '/json':
            res.writeHead(200, {'Content-Type': 'text/json;charset=UTF-8'});
            let obj = {name: "Dominik", age:17, gender: "Male"};
            let json = JSON.stringify(obj);
            res.write(json);

            break;

        case '/html':
            res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
            res.write('<h1>HTML!</h1>');
            res.write('<div>hjdyhdduddhdhdh</div>');
            res.write('<h1>HTML!</h1>');
            break;

        case '/htmlFile':
            readFile('myfile.html', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    res.end('Error reading file:');
                } else{
                    res.end(data);
                }
            });
            break;

    }
    res.end();

});

server.listen(8080, 'localhost', () => {
    console.log(`Server running at http://localhost:${8080}/`);
});