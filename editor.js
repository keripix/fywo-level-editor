;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var CanvasStarter = require("./libs/canvasStarter"),
    CoordinateNorm = require("./libs/coordinateNorm"),
    BlockReader = require("./libs/blocksReader"),
    BlocksPainter = require("./libs/blocksPainter"),
    MousePosition = require("./libs/canvasPositionDetector");

var canvas = document.getElementById('level-editor'),
    starter = new CanvasStarter(canvas),
    painter = new BlocksPainter(canvas, new CoordinateNorm(), new MousePosition(canvas), {blockWidth: 10, blockHeight: 10});

// lets draw the lines
starter.drawLines(10, 10);
// start painter
painter.start();
},{"./libs/blocksPainter":2,"./libs/blocksReader":3,"./libs/canvasPositionDetector":4,"./libs/canvasStarter":5,"./libs/coordinateNorm":6}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
/**
 * Module to read items placed on top of the canvas.
 *
 * TODO An item doesn't has to be a block.
 */

module.exports = Reader;

function Reader(conf){
  this.blockWidth = conf.blockWidth;
  this.blockHeight = conf.blockHeight;
  this.detected = [];
}

Reader.prototype.read = function(canvas) {
  var results = [],
      detected,
      ctx = canvas.getContext("2d"),
      canvasWidth = canvas.width;

  // we will asume that each block has a width and height of 10
  for (var i = 0, n = canvas.height; i < n; i += this.blockHeight) {
    this.parseLine(ctx.getImageData(0, i, canvasWidth, 1).data, i / this.blockHeight);
    // console.log(this.detected);
  }

  return results;
};

Reader.prototype.parseLine = function(data, line) {
  var i = 0,
      n = data.length;

  while( i < n) {
    if (data[i] === 0 && data[i+1] === 0 && data[i+2] === 0){
      this.detected.push({
        x: i / 4,
        y: line * this.blockHeight,
        width: this.blockWidth,
        height: this.blockHeight
      });
    }

    i += 4*this.blockWidth;
  }
};
},{}],4:[function(require,module,exports){
"use strict";

module.exports = CanvasPositionDetector;

function CanvasPositionDetector(canvas){
  this.canvas = canvas;

  this.calculateCanvasPosition();
}

CanvasPositionDetector.prototype.calculateCanvasPosition = function(){
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingLeft'], 10) || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingTop'], 10) || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderLeftWidth'], 10) || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderTopWidth'], 10) || 0;
  }

  var html = document.body.parentNode;

  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;
};

CanvasPositionDetector.prototype.getMousePosition = function(e) {
  var offsetX = 0,
      offsetY = 0,
      mx,
      my,
      element = this.canvas;

  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;

  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
};
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
/**
 * Responsible to place an item inside a certain
 * width x height boxes.
 */

module.exports = CoordinateNorm;

function CoordinateNorm(){}

CoordinateNorm.prototype.normalize = function(point, blockWidth, blockHeight) {
  return {
    x: point.x - (point.x % blockWidth),
    y: point.y - (point.y % blockHeight)
  };
};
},{}]},{},[1])
;