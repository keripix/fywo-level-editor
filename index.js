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