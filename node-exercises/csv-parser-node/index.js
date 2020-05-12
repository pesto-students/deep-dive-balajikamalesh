const parser = require('./fileconverter');

parser.myParser('./sampleSmall.csv',{ UseHeader: false, 
                                      transformHeader: header => header.map( column =>  column.toUpperCase()),
                                      outputFile: './sample.txt',
                                      logError: true });