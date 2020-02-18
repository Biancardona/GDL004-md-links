const fs = require('fs');
const path = require('path');
//let mdLinks = {};

var ext = path.extname('index.js');
console.log(ext);

if (ext === '.md') {
  fs.readFile('README.md', 'utf8',(err, data) => {
    if (err) { throw err; }
    console.log('data: ', data);
  });
  console.log('the file is read');
}

