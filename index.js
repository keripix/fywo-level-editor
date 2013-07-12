var CanvasStarter = require("./libs/canvasStarter"),
    CoordinateNorm = require("./libs/coordinateNorm"),
    BlockReader = require("./libs/blocksReader"),
    BlocksPainter = require("./libs/blocksPainter"),
    MousePosition = require("./libs/canvasPositionDetector"),
    GameBlockConf = require("./libs/gameBlockConfig");

var gameBlockConf = new GameBlockConf(),
    canvas = document.getElementById("level-editor"),
    gridCanvas = document.getElementById("grids"),
    starter = new CanvasStarter(gridCanvas),
    painter = new BlocksPainter(canvas, new CoordinateNorm(), new MousePosition(canvas), gameBlockConf),
    blockReader = new BlockReader(gameBlockConf);

// lets draw the lines
starter.drawLines(10, 10);
// start painter
painter.start();

// atach listener to generate-btn
var generateBtn = document.getElementById("generate-btn"),
    levelEditor = document.getElementById("conf-editor");

// generate level configuration
generateBtn.addEventListener("click", function(){
  var config = blockReader.read(painter.getPaintedCanvas());
  levelEditor.value = JSON.stringify(config);
});