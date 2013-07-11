var CanvasStarter = require("./libs/canvasStarter"),
    CoordinateNorm = require("./libs/coordinateNorm"),
    BlockReader = require("./libs/blocksReader"),
    BlocksPainter = require("./libs/blocksPainter"),
    MousePosition = require("./libs/canvasPositionDetector");

var canvas = document.getElementById("level-editor"),
    gridCanvas = document.getElementById("grids"),
    starter = new CanvasStarter(gridCanvas),
    painter = new BlocksPainter(canvas, new CoordinateNorm(), new MousePosition(canvas), {blockWidth: 10, blockHeight: 10}),
    blockReader = new BlockReader({
      blockWidth: 10,
      blockHeight: 10
    });

// lets draw the lines
starter.drawLines(10, 10);
// start painter
// test this
painter.start();

// atach listener to generate-btn
var generateBtn = document.getElementById("generate-btn"),
    levelEditor = document.getElementById("conf-editor");

generateBtn.addEventListener("click", function(){
  var config = blockReader.read(painter.getPaintedCanvas());
  levelEditor.value = JSON.stringify(config);
});