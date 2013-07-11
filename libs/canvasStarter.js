/**
 * Responsible to prepare canvas. There will be grids drawn on top
 * of the canvas, horizontal grids and vertical grids.
 * @param  {Canvas} canvas       The canvas
 * @param  {Number} xGridSpacing The spacing between the vertical grids
 * @param  {Number} yGridSpacing The spacing between the horizontal grids
 */
module.exports = CanvasStarter;

function CanvasStarter(canvas){
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
}

CanvasStarter.prototype.drawLines = function(xGridSpacing, yGridSpacing){
  // line properties
  this.ctx.strokeStyle = "#E74C3C";

  this.ctx.beginPath();
  // draw vertical lines
  for (var i = xGridSpacing, n = this.canvas.width; i < n; i += xGridSpacing){
    this.ctx.moveTo(i, 0);
    this.ctx.lineTo(i, this.canvas.height);
  }

  // draw horizontal lines
  for (i = yGridSpacing, n = this.canvas.height; i < n; i += yGridSpacing){
    this.ctx.moveTo(0, i);
    this.ctx.lineTo(this.canvas.width, i);
  }
  this.ctx.stroke();
};