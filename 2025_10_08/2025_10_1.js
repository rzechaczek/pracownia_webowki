let http = require('http');
const url = require('url');
const hostname = "127.0.0.1";
const port = 8080;
const fs = require('fs');
const { readFile, readFileSync} = require('fs/promises');
http.createServer(async (req, res)=> {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;
    switch (parsedUrl.pathname) {
        case '/str':
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
        case '/get_params':
            console.log(JSON.stringify(queryParams, null, 2));
            fs.writeFile(`params_${Date.now()}.json`, JSON.stringify(queryParams, null, 2),(err) =>
                {
                    if(err){
                        console.error('Wystąpił błąd podczas zapisu', err);
                        return
                    }
                    console.log('Dane zostały zapisane');
                });
            const Object = {'ok':'ok'};
            res.end(JSON.stringify(Object));
            break;

    }
    res.end();

}).listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${8080}/`);
});

