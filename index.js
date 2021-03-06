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