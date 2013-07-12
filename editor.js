;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var CanvasStarter = require("./libs/canvasStarter"),
    CoordinateNorm = require("./libs/coordinateNorm"),
    BlocksPainter = require("./libs/blocksPainter"),
    MousePosition = require("./libs/canvasPositionDetector"),
    GameBlockConf = require("./libs/gameBlockConfig");

var gameBlockConf = new GameBlockConf(),
    canvas = document.getElementById("level-editor"),
    gridCanvas = document.getElementById("grids"),
    starter = new CanvasStarter(gridCanvas),
    painter = new BlocksPainter(canvas, new CoordinateNorm(), new MousePosition(canvas), gameBlockConf);

// lets draw the lines
starter.drawLines(10, 10);
// start painter
painter.start();

// atach listener to generate-btn
var generateBtn = document.getElementById("generate-btn"),
    levelEditor = document.getElementById("conf-editor"),
    blockButtonList = document.getElementById("block-btn-list");

// generate level configuration
generateBtn.addEventListener("click", function(){
  var config = gameBlockConf.paintedBlocks;
  levelEditor.value = JSON.stringify(config);
});

blockButtonList.addEventListener("click", function(e){
  gameBlockConf.setActiveColor(e.target.id + "Color");
});
},{"./libs/blocksPainter":2,"./libs/canvasPositionDetector":4,"./libs/canvasStarter":5,"./libs/coordinateNorm":6,"./libs/gameBlockConfig":7}],2:[function(require,module,exports){
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
},{"./canvasFactory":3}],3:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
/**
 * Responsible for holding the block configuration used
 * in the level editor.
 */

module.exports = GameBlockConfig;

function GameBlockConfig(conf){
  conf = conf || {};

  this.blocksColor = conf.blocksColor || "#010101";
  this.actorColor = conf.actorColor || "#ECF0F1";
  this.exitColor = conf.exitColor || "#27AE60";
  this.keyColor = conf.keyColor || "#E74C3C";

  this.blockWidth = conf.blockWidth || 10;
  this.blockHeight = conf.blockHeight || 10;

  this.paintedBlocks = {
    blocks: [],
    actor: [],
    exit: [],
    key: []
  };

  this.activeColor = this.blocksColor;
  this.activeKey = "blocksColor";
}

GameBlockConfig.prototype.setActiveColor = function(name) {
  if (!this[name]){
    return;
  }

  this.activeColor = this[name];
  this.activeKey = name;
};

/**
 * Get the current active color to paint
 * @return {String} RGB string representation
 */
GameBlockConfig.prototype.getActiveColor = function() {
  return this.activeColor;
};

GameBlockConfig.prototype.addBlock = function(color, points) {
  color = color || this.activeKey;

  var name = color.replace("Color", "");

  if (!this.paintedBlocks[name]){
    return;
  }

  // dont paint if block already existed on the same point
  if (this.blockExist(name, points)){
    return;
  }

  this.paintedBlocks[name].push({
    x: points.x,
    y: points.y,
    width: this.blockWidth,
    height: this.blockHeight,
    color: this[color]
  });
};

GameBlockConfig.prototype.blockExist = function(name, points){
  var found = false;

  this.paintedBlocks[name].forEach(function(item){
    if (item.x === points.x && item.y === points.y){
      found = true;
      return;
    }
  });

  return found;
};

GameBlockConfig.prototype.deletePaintedBlockItem = function(name, points) {
  for (var i = this.paintedBlocks[name].length - 1; i >= 0; i--) {
    if (this.paintedBlocks[name][i].x === points.x && this.paintedBlocks[name][i].y === points.y){
      this.paintedBlocks[name].splice(i, 1);
    }
  }
};

/**
 * Delete any blocks on this position
 * @param  {Object} points Coordinate
 */
GameBlockConfig.prototype.deleteBlock = function(points) {
  // iterate on blocks
  this.deletePaintedBlockItem("blocks", points);
  // iterate on actor
  this.deletePaintedBlockItem("actor", points);
  // iterate on key
  this.deletePaintedBlockItem("key", points);
  // iterate on exit
  this.deletePaintedBlockItem("exit", points);
};
},{}]},{},[1])
;