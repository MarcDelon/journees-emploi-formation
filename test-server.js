const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Server</title>
    </head>
    <body>
      <h1>Test Server Fonctionne !</h1>
      <p>Si vous voyez ce message, le serveur HTTP fonctionne correctement.</p>
      <p>Le problème vient probablement de Next.js.</p>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('Test server running at http://localhost:3000/');
});


