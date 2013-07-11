module.exports = BlocksPainter;

function BlocksPainter(canvas, coordinateNormalizer){
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.cm = coordinateNormalizer;
}

/**
 * Start listening to mouse events on top of the canvas
 */
BlocksPainter.prototype.start = function() {
  // body...
};