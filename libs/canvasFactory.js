"use strict";

module.exports = CanvasFactory;

function CanvasFactory(){}

/**
 * Create a new canvas below the given canvas
 * @param  {Object} canvas Canvas
 */
CanvasFactory.prototype.createBelow = function(canvas) {
  var temp = document.createElement("canvas");

  temp.width = canvas.width;
  temp.height = canvas.height;

  temp.style.position = canvas.style.position;
  temp.style.width = parseInt(canvas.width + "px";
  temp.style.height = parseInt(canvas.height) + "px";
  temp.style.top = parseInt(canvas.style.top) + "px";
  temp.style.left = parseInt(canvas.style.left) + "px";
  temp.style["background-color"] = canvas.style["background-color"];

  temp.style["z-index"] = 99;

  document.body.appendChild(temp);

  return temp;
};