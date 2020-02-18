const fs = require('fs');


fs.readFile('README.md', 'utf8',(err, data) => {
  if (err)
  return console.log(err);
     console.log(data) ;
});
console.log('the file is read');
