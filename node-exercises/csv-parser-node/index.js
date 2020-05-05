const { Transform } = require('stream');
const fs = require('fs');

class cvsToJSONTransformer extends Transform {

    constructor() {
      super({
        readableObjectMode: true,
        writableObjectMode: true,
        encoding: 'utf-8'
      })
      this.header = {};
      this.seperator = ',';
      this.delimiter = '\n';
      this.lineNumber = 0;
    }

    _transform(chunk, encoding, next){
      let data = chunk.toString();
      let array = [];

      data.split(this.delimiter).forEach(line => {
        
        if(this.lineNumber == 0){
          const header = line.split(',');
          const headerkeys = header.reduce((key1,key2)=> (key1[key2]='', key1), {});
          this.header = headerkeys;
          array.push(headerkeys);
        } else {
          let values = line.split(/(".*?"|[^",]+)(?=\s*,|\s*$)/g).filter(x=> x !== ",").filter(x => x.length > 0);
          let obj = {};
          let index = 0;
          for(let key in this.header){
            obj[key] = values[index];
            ++index;
          }
          array.push(obj);
        }
        
        this.lineNumber++;
      });

      this.push(JSON.stringify(array));
      next()
    }
  
  }
 

const src = fs.createReadStream('./sample.csv', {encoding: 'utf-8'});
const dest = fs.createWriteStream('./sample.txt');

src
.pipe(new cvsToJSONTransformer())
.pipe(dest);



