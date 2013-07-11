/**
 * Responsible to prepare canvas. There will be grids drawn on top
 * of the canvas, horizontal grids and vertical grids.
 * @param  {Canvas} canvas       The canvas
 * @param  {Number} xGridSpacing The spacing between the vertical grids
 * @param  {Number} yGridSpacing The spacing between the horizontal grids
 */
module.exports = function(canvas, xGridSpacing, yGridSpacing){
  var ctx = canvas.getContext("2d");

  // line properties
  ctx.strokeStyle = "#E74C3C";

  ctx.beginPath();
  for (var i = xGridSpacing, n = canvas.width; i < n; i += xGridSpacing){
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }
  ctx.stroke();
};