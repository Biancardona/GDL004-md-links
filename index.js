const fs = require('fs');
const path = require('path');
const mdLinks = process.argv[2];
const fetch = require('node-fetch');

let validLinks = []
let invalidLinks = []

//Regex global para leer los links
const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm

//Para verificar la extension del archivo
const ext = path.extname(mdLinks);
//console.log(ext);

if (ext === '.md') {
  fs.readFile(mdLinks, 'utf8', (err, data) => {
    const matches = data.match(regexMdLinks)

    //Regex para obtener los links con el texto
    const singleMatch = /\[([^\[]+)\]\((.*)\)/
    for (var i = 0; i < matches.length; i++) {
      var text = singleMatch.exec(matches[i])

      // Visualizacion de los links mas el texto con el retorno de la REGEX
      regexResult = (`#${i} File:  ${mdLinks} Text: ${text[1]} Link: ${text[2]}`);
      console.log(regexResult)
      //console.log(result);

      // //Usando fetch para hacer peticion de extraer datos (link)
      fetch(text[2])
        .then(checkStatus)
        .then(function (data) {
          console.log('Request succeeded with JSON response', data);
        }).catch(function (error) {
          console.log('Request failed', error);
        });
    }
    if (err) {
      throw err;
    }
  });
} else {
  console.log('Is not a .MD file');
}
// Funcion para checar el status del link
function checkStatus(response) {
  if (response.checkStatus >= 200 && response.checkStatus < 300) {
    validLinks.push(response.url)
    return Promise.resolve(response)
  } else {
    invalidLinks.push(response.url)
    return Promise.reject(new Error(response.statusText))
  }
}

// function checkStatus(res) {
//   //  console.log(res)
//   if (res.status < 400) {
//     //console.log(res.status)
//     validLinks.push(res.url)
//   } else {
//     invalidLinks.push(res.url)
//     //let err = new Error(res.statusText)
//     //err.response = res
//     //throw err
//   }

//   console.log('Valid Links: ', validLinks)
//   console.log('Invalid Links: ', invalidLinks)

// }


//Promise.all(checkStatus).then(() => {

/* if (process.argv[3] === '--validate') {
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
