/*
Code by  : Shahid Dhariwala
LinkedIn : https://www.linkedin.com/in/shahiddhariwala/
Twitter  : https://twitter.com/shahiddhariwala
Date     : 17-May-2020
*/


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

    //PRODUCTS OVERVIEW
    if (pathName === "/products" || pathName === "/") {
        //header 200 for ok , content type
        res.writeHead(200, {
            "Content-type": "text/html",
        });

        fileSystem.readFile(`${__dirname}/data/templates/template-overview.html`, 'utf-8', (err, data) => {

            let overviewOutput =data;
            fileSystem.readFile(`${__dirname}/data/templates/template-card.html`, 'utf-8', (err, cdata) => {
               
                const cardsOutput = laptopData.map(el => replaceTemplate(cdata,el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}',cardsOutput);
                res.end(overviewOutput);
            });
        });
        
    } 
    //LAPTOP OVERVIEW
    else if (pathName === "/laptop" && id < laptopData.length) {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        fileSystem.readFile(`${__dirname}/data/templates/template-laptop.html`, 'utf-8', (err, data) => {

            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop)
            res.end(output);
        });
    } 
    //IMAGES
    else if ((/\.(jpg|jpeg|gif|png)$/i).test(pathName))
    {
        fileSystem.readFile(`${__dirname}/${pathName}`,(err,data)=>
        {
            res.writeHead(200, {
                "Content-type": "image/jpg",
            });
            res.end(data);
        });
    }
    //URL NOT FOUND
    else {
        res.writeHead(404, {
            "Content-type": "text/html",
        });
        res.end("URL Not Found");
    }
});

//now we need listener port on our server, so that someone can access it
server.listen(8080, "127.0.0.1", () => {
    console.log("Started listening for request now ! ");
});

function replaceTemplate(originalHTML, laptop) {
    let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}