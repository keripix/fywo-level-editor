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
}

/**
 * Start listening to mouse events on top of the canvas
 */
BlocksPainter.prototype.start = function() {
  this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
  this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
};

BlocksPainter.prototype.onMouseDown = function(e) {
  this.isPainting = true;

  var points = this.mp.getMousePosition(e);
  this.paintBlock(this.cm.normalize(points, this.blockWidth, this.blockHeight));
};

BlocksPainter.prototype.onMouseMove = function(e) {
  if (this.isPainting){
    var points = this.mp.getMousePosition(e);
    this.paintBlock(this.cm.normalize(points, this.blockWidth, this.blockHeight));
  }
};

BlocksPainter.prototype.onMouseUp = function(e) {
  this.isPainting = false;
};

/**
 * Paints the block. The points should've been normalized.
 * @param  {Object} points The points to paint the block
 */
BlocksPainter.prototype.paintBlock = function(points) {
  this.ctx.fillStyle = "#000000";
  this.ctx.fillRect(points.x, points.y, this.blockWidth, this.blockHeight);
};