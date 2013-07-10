module.exports = Reader;

function Reader(canvas){
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;

  this.results = [];
}

Reader.prototype.read = function() {
  // we will asume that each block has a width and height of 10
  for (var i = 0, n = this.canvasHeight; i < n; i += 10) {
    this.results.push = this.parseLine(this.ctx.getImageData(0, 10, this.canvasWidth, this.canvasHeight).data);
  }
};

Reader.prototype.parseLine = function(data, line) {
  var detected = [];

  for (var i = 0, n = data.length; i < n; i += 4) {
    if (data[i] === 0){
      detected.push({
        x: i * 10 / 4,
        y: line * 10,
        width: 10,
        height: 10
      });
    }
  }

  return detected;
};