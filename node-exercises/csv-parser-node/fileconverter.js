const fs = require('fs');
const { Transform } = require('stream');

class fileTransformer extends Transform {

    constructor(options) {
      super({
        readableObjectMode: true,
        writableObjectMode: true,
        encoding: 'utf-8'
      })

      this.UseHeader = options.UseHeader !== undefined ? options.UseHeader : true;
      if(typeof options.transformHeader !== 'function'){
          throw new TypeError('Headers input should be a function');
      }
      this.transformHeader = options.transformHeader;
      this.header = {};
      this.headerSeparator = options.seperator ? options.seperator : ',';
      this.dataSeparator = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
      this.delimiter = options.delimiter ? options.delimiter : '\n';
      this.logError = options.logError;
      this.lineNumber = 0;
      this.chunkCount = 0;
    }

  _transform(chunk, encoding, next){
      let data = chunk.toString();
      let array = [];
      ++this.chunkCount;
      // console.log(this.chunkCount);

      data.split(this.delimiter).forEach(line => { 

        try {
          if(line.includes('#')){ //commented line
            line = line.slice(0,line.indexOf('#'));
          }
          if(line.length > 0){
            if(this.lineNumber == 0 && this.UseHeader){
              const header = (this.transformHeader !== undefined) ? this.transformHeader(line.split(this.headerSeparator)) 
                                                            : line.split(this.headerSeparator);
              const headerkeys = header.reduce((key1,key2)=> (key1[key2]='', key1), {});
              this.header = headerkeys;
            } else {
              let values = line.split(this.dataSeparator).filter(x=> x !== ",").filter(y => y !== '\r').filter(x => x.length > 0);
                if(this.UseHeader){
                    let row = {};
                    let index = 0;
                    if(values.length !== Object.keys(this.header).length){
                      throw new Error('Invalid CSV Record. Values doesn\'t match with the headers')
                    }
                    for(let key in this.header){
                        row[key] = values[index];
                        ++index;
                    }
                    array.push(row);
                } else{
                    let row = [];
                    [...Array(values.length).keys()].forEach(index => row[index] = values[index]);
                    array.push(row);
                }
            } 
          }
        }catch(e) {
          if(this.logError)
            array.push(`Cannot process this row ${this.lineNumber}.Reason: ${e.message}`);
        }

        this.lineNumber++;
        
      });

      this.push(JSON.stringify(array));
      next()
  }
  
}

module.exports.myParser = function (path, options){
  const source = fs.createReadStream(path, { encoding: 'utf-8' });
  if(options.outputFile){
    const destination = fs.createWriteStream(options.outputFile);
    return source.pipe(new fileTransformer(options)).pipe(destination);
  } else {
    let output = source.pipe(new fileTransformer(options));
    output.on('data', (chunk) => {
      process.stdout.write(chunk);
    } )  
  }
}
 