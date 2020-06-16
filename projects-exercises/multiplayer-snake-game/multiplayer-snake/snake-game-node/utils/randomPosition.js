module.exports = function() {
    let min = 1, max = 98;
    let x = Math.floor((Math.random() * (min + (max - min + 1))) / 2) * 2;
    let y = Math.floor((Math.random() * (min + (max - min + 1))) / 2) * 2;
    return [x, y];
  }