const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);

  let path = './';
  if (req.url === '/') {
    // preload the css
    path += '/node/public/css/b531.css';
    res.setHeader('Content-Type', 'text/html');
  } else {
    // fetch other files according to suffix
    var surl = '.' + req.url;
    var type = surl.slice(surl.lastIndexOf('.') + 1);
    res.writeHead(200, { 'Content-type': 'text/' + type });
    path += req.url.slice(1);
  }
  // console.log(path);

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('listening request on 3000.');
});
