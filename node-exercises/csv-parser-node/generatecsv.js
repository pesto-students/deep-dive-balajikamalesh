const fs = require('fs');
const file = fs.createWriteStream('./bigFile.csv');
​
file.write(`anzsic06,Area,year,geo_count,ec_count`);
​
// 12e5  approx csv size 254MB
for (let i = 0; i <= 12e5; i++) {
  file.write(`A,A100100,2000,96,130
A,A100200,2000,198,110
A,A100300,2000,42,25
A,A100400,2000,66,40
A,A100500,2000,63,40
A,A100600,2000,21,12
A,A100700,2000,45,60
A,A100800,2000,36,60
A,A100900,2000,78,18
A,A101000,2000,42,9
`);
}
​
file.end();