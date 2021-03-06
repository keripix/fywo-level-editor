"use strict";

var CanvasFactory = require("./canvasFactory");

module.exports = BlocksPainter;

/**
 * Responsible to draw blocks on top of the canvas.
 * @param {Canvas} canvas               Canvas
 * @param {Object} coordinateNormalizer Normalize blocks position
 * @param {Object} mousePosition        Get the mouse position on top
 *                                      of the canvas
 * @param {Object} cfg                  Block Configuration
 */
function BlocksPainter(canvas, coordinateNormalizer, mousePosition, cfg){
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.cm = coordinateNormalizer;
  this.mp = mousePosition;

  this.cfg = cfg;

  this.blockWidth = cfg.blockWidth || 10;
  this.blockHeight = cfg.blockHeight || 10;

  // drawing states
  this.isPainting = false;
  this.tempBlock = undefined;

  this.canvasFactory = new CanvasFactory();
  this.bottomCanvas = undefined;
  this.bottomCtx = undefined;

  this.createAdditionalCanvas();
}

/**
 * Create bottom layer canvas. This bottom canvas is used to
 * draw non-temporary blocks
 */
BlocksPainter.prototype.createAdditionalCanvas = function() {
  this.bottomCanvas = this.canvasFactory.createBelow(this.canvas);
  this.bottomCtx = this.bottomCanvas.getContext("2d");
};

/**
 * Start listening to mouse events on top of the canvas
 */
BlocksPainter.prototype.start = function() {
  this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
  this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
  this.canvas.addEventListener("dblclick", this.onDoubleClick.bind(this));
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
  this.paintBottomBlock(this.cm.normalize(points, this.blockWidth, this.blockHeight));
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
    this.paintBottomBlock(normalizedPoints);
  } else {
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

    this.ctx.fillStyle = this.cfg.getActiveColor();
    this.ctx.fillRect(this.tempBlock.x, this.tempBlock.y, this.tempBlock.width, this.tempBlock.height);
  }
};

/**
 * Mark isPainting to false.
 *
 * @param  {Object} e Event Object
 */
BlocksPainter.prototype.onMouseUp = function(e) {
  this.isPainting = false;
  this.tempBlock = undefined;
};

/**
 * Delete the blocks
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
BlocksPainter.prototype.onDoubleClick = function(e) {
  var points = this.mp.getMousePosition(e),
      normalized = this.cm.normalize(points, this.blockWidth, this.blockHeight);
  // delete recorded block
  this.cfg.deleteBlock(normalized);
  // delete the block
  this.deletePaintedBottomBlock(normalized);
};

/**
 * Paints the block. The points should've been normalized.
 * @param  {Object} points The points to paint the block
 */
BlocksPainter.prototype.paintBlock = function(points) {
  this.ctx.fillStyle = this.cfg.getActiveColor();
  this.ctx.fillRect(points.x, points.y, this.blockWidth, this.blockHeight);
};

/**
 * Paint non-temporary block on the bottom canvas.
 * @param  {Object} points The normalized coordinates
 */
BlocksPainter.prototype.paintBottomBlock = function(points){
  if (!this.bottomCtx){
    return;
  }

  this.bottomCtx.fillStyle = this.cfg.getActiveColor();
  this.bottomCtx.fillRect(points.x, points.y, this.blockWidth, this.blockHeight);

  // record this block
  this.cfg.addBlock(this.cfg.activeKey, points);
};

/**
 * Delete a non-temporary block on this points
 * @param  {Object} points Normalized Coordinate Position
 */
BlocksPainter.prototype.deletePaintedBottomBlock = function(points) {
  this.bottomCtx.clearRect(points.x, points.y, this.blockWidth, this.blockHeight);
};

/**
 * Get the canvas which is used to draw the blocks. In this
 * case it is the bottom canvas
 *
 * @return {Object} Canvas
 */
BlocksPainter.prototype.getPaintedCanvas = function() {
  return this.bottomCanvas;
};