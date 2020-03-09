const fs = require('fs');
const path = require('path');
const mdLinks = process.argv[2];
const fetch = require('node-fetch');
const util = require("util");

//*** Regex global para leer los links ***
const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm

//*** Para verificar la extension del archivo ***
const ext = path.extname(mdLinks);
if (ext === '.md') {
  const readFile = util.promisify(fs.readFile);
  readFile(mdLinks, 'utf8')
    .then((text) => {
      //console.log(text);
      const matches = text.match(regexMdLinks)
      //*** Regex para obtener los links con el texto ***
      const singleMatch = /\[([^\[]+)\]\((.*)\)/
      for (var i = 0; i < matches.length; i++) {
        let text = singleMatch.exec(matches[i])
        // *** Visualizacion de los links mas el texto ***
        const file = []
        file.push(`${i} File: ${mdLinks}`);
        const texto = []
        texto.push(`Text: ${text[1]}`);
        const links = []
        links.push(text[2]);
        console.log(links)
      }
    });
} else {
  console.log('Is not a .MD file');
}

let validLinks = []
let invalidLinks = []

// *** Funcion para checar el status del link ***
const checkStatus = async (links) => {
  try {
    //*** Usando fetch para hacer peticion de extraer datos (link) ***
    const response = await fetch(links)
    if (response.status < 400) {
      validLinks.push(response.url)
    } else {
      invalidLinks.push(response.url)
       await Promise.reject(new Error(response.statusText))
    }
  } catch (error) {
    console.log('Request failed1', error);
  }
};
checkStatus()
  .catch(function (error) {
    console.log('Request failed', error);
  });

console.log(validLinks)
console.log(invalidLinks)
//console.log('Valid Links: ', validLinks)
//console.log('Invalid Links: ', invalidLinks)

/*Promise.all(checkStatus).then(() => {

 if (process.argv[3] === '--validate') {
    console.log(validLinks);
  } else if (process.argv[3] === '--stats') {

  } else if (process.argv[3] === '--stats' && process.argv[4] === '--validate') {
  }
});


/*function counterStats (text[1]) {
  let promises = text[1].map
}
let correctCount = 0;
let brokenCount = 0;
*/
