const fs = require('fs');
const fileTransformer = require('./fileconverter');

const src = fs.createReadStream('./sample.csv', { encoding: 'utf-8' });
const dest = fs.createWriteStream('./sample.txt');

src
.pipe(fileTransformer({ UseHeader: true, Headers: header => header.map( column =>  column.toUpperCase() )}))
.pipe(dest);