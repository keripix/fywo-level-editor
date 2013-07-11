/**
 * Module to read items placed on top of the canvas.
 *
 * TODO An item doesn't has to be a block.
 */

module.exports = Reader;

function Reader(conf){
  this.blockWidth = conf.blockWidth;
  this.blockHeight = conf.blockHeight;
  this.detected = [];
}

Reader.prototype.read = function(canvas) {
  var ctx = canvas.getContext("2d"),
      canvasWidth = canvas.width;

  // we will asume that each block has a width and height of 10
  for (var i = 0, n = canvas.height; i < n; i += this.blockHeight) {
    this.parseLine(ctx.getImageData(0, i, canvasWidth, 1).data, i / this.blockHeight);
    // console.log(this.detected);
  }

  return this.detected;
};

Reader.prototype.parseLine = function(data, line) {
  var i = 0,
      n = data.length;

  while( i < n) {
    if (data[i] === 0 && data[i+1] === 0 && data[i+2] === 0){
      this.detected.push({
        x: i / 4,
        y: line * this.blockHeight,
        width: this.blockWidth,
        height: this.blockHeight
      });
    }

    i += 4*this.blockWidth;
  }
};