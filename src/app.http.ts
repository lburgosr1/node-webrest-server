import fs from 'fs';
import http from 'http';


const server = http.createServer((req, res) => {
    console.log(req.url);
    
    /* res.write('Hola Mundo');
    res.end(); */

    /* res.writeHead(200, { 'Contet-Type': 'text/html' });
    res.write(`<h1>URL ${req.url}</h1>`);
    res.end(); */

    /* const data = {name: 'John Doe', age: 30, city: 'New York' };
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(data)); */

    let htmlFile;

    /* if(req.url === '/') {
        htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
    } else if(req.url && req.url === '/css/styles.css') {
        htmlFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(htmlFile);
    } else if(req.url === '/js/app.js') {
        htmlFile = fs.readFileSync('./public/js/app.js', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(htmlFile);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    } */

    if(req.url === '/') {
        htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if(req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript'});
    } else if(req.url?.endsWith('.css')) {
        res.writeHead(200, {"Content-Type": 'text/css'});
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
});


server.listen(8080, () => {
    console.log('Server running on port 8080');
});