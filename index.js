console.log("Node Start !!");

//adding fs module
const fileSystem = require("fs");
/*
Node.js includes fs module to access physical file system. The fs module is responsible for all the asynchronous or synchronous file I/O operations.
*/

//adding http & url module
const http = require("http");
const url = require("url");

// console.log(__dirname); will give current path
const json = fileSystem.readFileSync(`${__dirname}/data/data.json`, `utf-8`);
const laptopData = JSON.parse(json); // converts to JSON object

// will create a server
const server = http.createServer((req, res) => {
    // console.log(req.url);

    //routing 
    const pathName = url.parse(req.url, true).pathname;
    //query.id
    const id = url.parse(req.url, true).query.id;

    if (pathName === "/products" || pathName === "/") {
        //header 200 for ok , content type
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        res.end("This is the Product Page");
    } else if (pathName === "/laptop" && id < laptopData.length) {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        res.end(`This is the Laptop Page for Laptop with id ${id}`);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
        });
        res.end("URL Not Found");
    }
});

//now we need listener port on our server, so that someone can access it
server.listen(1337, "127.0.0.1", () => {
    console.log("Started listening for request now ! ");
});