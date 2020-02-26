const fs = require('fs');
const path = require('path');
const mdLinks = process.argv[2];
const fetch = require('node-fetch');



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
      fetch(text[2])
        .then(checkStatus)
        .catch(error => console.log(error))
    }
    if (err) {
      throw err;
    }
  });
} else {
  console.log('Is not a .MD file');
}


function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    console.log(res.status)
    return res
  } else {
    let err = new Error(res.statusText)
    err.response = res
    throw err
  }
}
