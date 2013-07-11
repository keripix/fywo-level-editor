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

  var rect = canvas.getBoundingClientRect();

  temp.style.position = "absolute";
  temp.style.top = rect.top + "px";
  temp.style.left = rect.left + "px";
  temp.style["background-color"] = "transparent";

  temp.style["z-index"] = 99;

  document.body.appendChild(temp);

  return temp;
};