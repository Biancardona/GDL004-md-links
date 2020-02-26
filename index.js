const fs = require('fs');
const path = require('path');
const mdLinks = process.argv[2];
const fetch = require('node-fetch');
let validLinks = []
let invalidLinks = []

//Regex global para leer los
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
    //Regex para obtener los links con el texto
    const singleMatch = /\[([^\[]+)\]\((.*)\)/
    for (var i = 0; i < matches.length; i++) {
      var text = singleMatch.exec(matches[i])
      // Visualizacion de los links mas el texto
      console.log(`#${i} File:  ${mdLinks} Text: ${text[1]} Link: ${text[2]}`)
      //console.log(`Word  #${i}: ${text[1]}`)
      //console.log(`Link  #${i}: ${text[2]}`)
      //Usando fetch para hacer peticion de extraer datos
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
  console.log(res)
  if (res.status < 400) {
    console.log(res.status)
    validLinks.push(res.url)
  } else {
    invalidLinks.push(res.url)
    let err = new Error(res.statusText)
    err.response = res
    throw err
  }
  console.log(validLinks)
  console.log(invalidLinks)
}
