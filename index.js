const fs = require('fs');
const path = require('path');
const mdLinks = process.argv[2];


console.log(mdLinks);
const ext = path.extname(mdLinks);
console.log(ext);
if (ext === '.md') {
  fs.readFile(mdLinks, 'utf8', (err, data) => {
    console.log('data: ', data);
    console.log('the file is read');
    if (err) {
      throw err;
    }
});
} else {
  console.log('Is not a .MD file');
}


