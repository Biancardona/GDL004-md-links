const fs = require('fs');
const path = require('path');
const mdLinks = process.argv[2];

const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm


console.log(mdLinks);
const ext = path.extname(mdLinks);
console.log(ext);
if (ext === '.md') {
  fs.readFile(mdLinks, 'utf8', (err, data) => {
    const matches = data.match(regexMdLinks)
    console.log('data: ', data);
    console.log('the file is read');
    console.log('matches: ', matches)
    const singleMatch = /\[([^\[]+)\]\((.*)\)/
    for (var i = 0; i < matches.length; i++) {
      var text = singleMatch.exec(matches[i])
      //console.log(`Match #${i}:`, text)
      console.log(`Word  #${i}: ${text[1]}`)
      console.log(`Link  #${i}: ${text[2]}`)
    }
    if (err) {
      throw err;
    }
  });
} else {
  console.log('Is not a .MD file');
}
