module.exports = Reader;

function Reader(canvas){
  this.canvas = canvas;
  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;
}

Reader.prototype.read = function() {
  // body...
};