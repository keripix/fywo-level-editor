var CanvasStarter = require("./libs/canvasStarter"),
    CoordinateNorm = require("./libs/coordinateNorm"),
    BlockReader = require("./libs/blocksReader"),
    BlocksPainter = require("./libs/blocksPainter");

var canvas = document.getElementById('level-editor'),
    starter = new CanvasStarter(canvas),
    painter = new BlocksPainter(canvas, new CoordinateNorm());

// lets draw the lines
starter.drawLines(10, 10);
// start painter
painter.start();