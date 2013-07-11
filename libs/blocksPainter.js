"use strict";

module.exports = BlocksPainter;

/**
 * Responsible to draw blocks on top of the canvas.
 * @param {Canvas} canvas               Canvas
 * @param {Object} coordinateNormalizer Normalize blocks position
 * @param {Object} mousePosition        Get the mouse position on top
 *                                      of the canvas
 */
function BlocksPainter(canvas, coordinateNormalizer, mousePosition, cfg){
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.cm = coordinateNormalizer;
  this.mp = mousePosition;

  this.blockWidth = cfg.blockWidth || 10;
  this.blockHeight = cfg.blockHeight || 10;

  // drawing states
  this.isPainting = false;
  this.tempBlock = undefined;
}

/**
 * Start listening to mouse events on top of the canvas
 */
BlocksPainter.prototype.start = function() {
  this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
  this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
};

/**
 * Mark isPainting to true. We alse need to draw a new block on the point
 * in which the mouse was pressed
 *
 * @param  {Object} e Event Object
 */
BlocksPainter.prototype.onMouseDown = function(e) {
  this.isPainting = true;

  var points = this.mp.getMousePosition(e);
  this.paintBlock(this.cm.normalize(points, this.blockWidth, this.blockHeight));
};

/**
 * Draw blocks according to the mouse state. If we are already painting, then
 * we need to draw the current block on the current positon. If not, then we
 * need to draw a temporary block.
 *
 * @param  {Object} e Event Object
 */
BlocksPainter.prototype.onMouseMove = function(e) {
  var points = this.mp.getMousePosition(e),
      normalizedPoints = this.cm.normalize(points, this.blockWidth, this.blockHeight);

  if (this.isPainting){
    // if already painting, then paint this block
    this.paintBlock(normalizedPoints);
  } else {
    // then we need to clear out the previous temporary block
    if (this.tempBlock){
      this.ctx.clearRect(this.tempBlock.x, this.tempBlock.y, this.tempBlock.width, this.tempBlock.height);
    }
    // and then draw a new one
    this.tempBlock = {
      x: normalizedPoints.x,
      y: normalizedPoints.y,
      width: this.blockWidth,
      height: this.blockHeight
    };

    this.ctx.fillRect(this.tempBlock.x, this.tempBlock.y, this.tempBlock.width, this.tempBlock.height);
  }
};

/**
 * Mark isPainting to false. We also need to draw a block in which the
 * mouse was released.
 *
 * @param  {Object} e Event Object
 */
BlocksPainter.prototype.onMouseUp = function(e) {
  var points = this.mp.getMousePosition(e);

  this.paintBlock(this.cm.normalize(points));

  this.isPainting = false;
  this.tempBlock = undefined;
};

/**
 * Paints the block. The points should've been normalized.
 * @param  {Object} points The points to paint the block
 */
BlocksPainter.prototype.paintBlock = function(points) {
  this.ctx.fillStyle = "#000000";
  this.ctx.fillRect(points.x, points.y, this.blockWidth, this.blockHeight);
};