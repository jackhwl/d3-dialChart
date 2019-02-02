var fs = require('fs');

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if (req.url === '/file.txt') {
    fs.createReadStream(__dirname + '/file.txt').pipe(res);
  } else {
    res.end("Hello world");
  }
}).listen(8080, 'localhost');
console.log('PORT=', process.env)
console.log('PORT=', process.env.PORT)
console.log('ip=', process.env.IP)
console.log('Server running!');