var CanvasStarter = require("./libs/canvasStarter"),
    CoordinateNorm = require("./libs/coordinateNorm"),
    BlockReader = require("./libs/blocksReader"),
    BlocksPainter = require("./libs/blocksPainter"),
    MousePosition = require("./libs/canvasPositionDetector");

var gameConfiguration = {
      blockWidth: 10,
      blockHeight: 10,
      actorColor: "rgb(236, 240, 241)",
      blockColor: "rgb(1,1,1)",
      exitColor: "rgb(39, 174, 96)"
    },
    canvas = document.getElementById("level-editor"),
    gridCanvas = document.getElementById("grids"),
    starter = new CanvasStarter(gridCanvas),
    painter = new BlocksPainter(canvas, new CoordinateNorm(), new MousePosition(canvas), gameConfiguration),
    blockReader = new BlockReader(gameConfiguration);

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