const fs = require('fs');
const parser = require('./fileconverter');

// test('read csv, parse to json and write to a file', () => {
//     parser.myParser('./sample.csv',{ UseHeader: true, 
//         Headers: header => header.map( column =>  column.toUpperCase()),
//         outputFile: './sample.txt',
//         logError: true });

//     let data = fs.readFileSync('./sample.txt');
//     console.log(JSON.parse(data));
    
// });

// test('read csv, parse to json and write to a file', () => {
//     parser.myParser('./sample.csv',{ UseHeader: true, 
//         Headers: header => header.map( column =>  column.toUpperCase()),
//         // outputFile: './sample.txt',
//         logError: true });
    
// });

test(' Performance test ', async () => {
    let start = performance.now();
    await parser.myParser('./sampleSmall.csv',{ UseHeader: true, 
        Headers: header => header.map( column =>  column.toUpperCase()),
        outputFile: './sample.txt',
        logError: true });
    let end = performance.now();    
    console.log(end - start);
});