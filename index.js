console.log('Node Start !!');

//adding fs module
const fileSystem = require('fs');
/*
Node.js includes fs module to access physical file system. The fs module is responsible for all the asynchronous or synchronous file I/O operations.
*/

//adding http module
const http = require('http');



// console.log(__dirname); will give current path 
const json = fileSystem.readFileSync(`${__dirname}/data/data.json`,`utf-8`);
const laptopData = JSON.parse(json); // converts to JSON object

// will create a server
const server = http.createServer((req,res)=>
{
    console.log("Someone accesed the server !");
});

//now we need listener port on our server, so that someone can access it
server.listen(1337,'127.0.0.1' ,()=>
{
    console.log("Starting listening for request now ! ");
});