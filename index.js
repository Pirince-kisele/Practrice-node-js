// normal way to create a server
const http = require('http');
const server = http.createServer((req,response) => {
  res.statuCode = 200;
  res.setHeader('Content-Type', 'text/plain');
    response.end('Hello World');
})

// listens on port 3000
server.listen(3000, 'localhost',() => {
  console.log('Server is running on port 3000');
});

// you can goo to node js page and copy all of this code for the startape