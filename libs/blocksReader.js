module.exports = Reader;

function Reader(conf){
  this.blockWidth = conf.blockWidth;
  this.blockHeight = conf.blockHeight;
}

Reader.prototype.read = function(canvas) {
  var results = [],
      detected,
      ctx = canvas.getContext("2d"),
      canvasWidth = canvas.width;

  // we will asume that each block has a width and height of 10
  for (var i = 0, n = canvas.height; i < n; i += 10) {
    detected = this.parseLine(ctx.getImageData(0, i, canvasWidth, i + 10).data, i / 10);

    if (detected.length){
      results.push(detected);
    }
  }

  return results;
};

Reader.prototype.parseLine = function(data, line) {
  var detected = [],
      i = 0,
      n = data.length;

  while( i < n) {
    if (data[i] === 0){
      detected.push({
        x: i * this.blockWidth / 4,
        y: line * this.blockHeight,
        width: this.blockWidth,
        height: this.blockHeight
      });
    }

    i += 4*this.blockWidth;
  }

  return detected;
};