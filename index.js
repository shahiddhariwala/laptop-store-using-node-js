console.log('Start!!');

//adding fs module
const fileSystem = require('fs');
/*
Node.js includes fs module to access physical file system. The fs module is responsible for all the asynchronous or synchronous file I/O operations.
*/
// console.log(__dirname); will give current path 
const json = fileSystem.readFileSync(`${__dirname}/data/data.json`,`utf-8`);
const laptopData = JSON.parse(json); // converts to JSON object
console.log(laptopData);