const { Transform } = require('stream');

class cvsToJSONTransformer extends Transform {

    constructor(options) {
      super({
        readableObjectMode: true,
        writableObjectMode: true,
        encoding: 'utf-8'
      })
      this.UseHeader = options.UseHeader !== undefined ? options.UseHeader : true;
      if(typeof options.Headers !== 'function'){
          throw new TypeError('Headers input should be a function');
      }
      this.Headers = options.Headers;
      this.header = {};
      this.headerSeparator = ',';
      this.dataSeparator = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
      this.delimiter = options.delimiter ? options.delimiter : '\n';
      this.lineNumber = 0;
    }

  _transform(chunk, encoding, next){
      let data = chunk.toString();
      let array = [];

      data.split(this.delimiter).forEach(line => { 
        if(this.lineNumber == 0 && this.UseHeader){
          const header = (this.Headers !== undefined) ? this.Headers(line.split(this.headerSeparator)) 
                                                         : line.split(this.headerSeparator);
          const headerkeys = header.reduce((key1,key2)=> (key1[key2]='', key1), {});
          this.header = headerkeys;
        } else {
          let values = line.split(this.dataSeparator).filter(x=> x !== ",").filter(x => x.length > 0);
            if(this.UseHeader){
                let obj = {};
                let index = 0;
                for(let key in this.header){
                    obj[key] = values[index];
                    ++index;
                }
                array.push(obj);
            } else{
                let arr = [];
                [...Array(values.length).keys()].forEach(index => arr[index] = values[index]);
                array.push(arr);
            }
        }
        this.lineNumber++;
      });

      this.push(JSON.stringify(array));
      next()
  }
  
}
 
module.exports = (opts) => new cvsToJSONTransformer(opts)





