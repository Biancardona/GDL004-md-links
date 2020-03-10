const fs = require('fs');
const path = require('path');
const mdLinks = process.argv[2];
const fetch = require('node-fetch');
const util = require("util");



//*** Regex global para leer los links ***
const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm


let validLinks = []
let invalidLinks = []

const parseMdFile = (mdFile) => {
  let links = [];
  let file = [];
  let texto = [];

  //*** Para verificar la extension del archivo ***
  const ext = path.extname(mdFile);
  if (ext === '.md') {
    fs.readFile(mdFile, 'utf8', (err,text) => {
    if(!err) {
          const matches = text.match(regexMdLinks)
          //*** Regex para obtener los links con el texto ***
          const singleMatch = /\[([^\[]+)\]\((.*)\)/
          for (var i = 0; i < matches.length; i++) {
            let text = singleMatch.exec(matches[i])
            // *** Visualizacion de los links mas el texto ***
            file.push(`${i} File: ${mdLinks}`);
            texto.push(`Text: ${text[1]}`);
            links.push(text[2]);
          }
          checkStatus(links);
          return links;
        }
      })
} else {
  console.log('Is not a .MD file');
}
}
const checkStatus = async (links) => {
  const urls = links.map(async url => {
    try {
      //*** Usando fetch para hacer peticion de extraer datos (link) ***
      const response = await fetch(url)
      if (response.status < 400) {
        validLinks.push(response.url)
      } else {
        invalidLinks.push(response.url)
        await Promise.reject(new Error(response.statusText))
      }
    } catch (error) {
      invalidLinks.push(url)
      console.log('Request failed1', error.message);
    }
  })
  await Promise.all(urls)
  console.log(`validLinks: `, validLinks);
  console.log(`invalidLinks: `, invalidLinks);
  }

parseMdFile(mdLinks);



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
