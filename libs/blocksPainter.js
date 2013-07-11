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
};

BlocksPainter.prototype.onMouseMove = function(e) {
  if (this.isPainting){

    var points = this.mp.getMousePosition(e),
        normalizedPoints = this.cm.normalize(points, this.blockWidth, this.blockHeight);

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(normalizedPoints.x, normalizedPoints.y, this.blockWidth, this.blockHeight);
  }
};

BlocksPainter.prototype.onMouseUp = function(e) {
  this.isPainting = false;
};