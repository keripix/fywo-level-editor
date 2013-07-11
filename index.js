var CanvasStarter = require("./libs/canvasStarter"),
    CoordinateNorm = require("./libs/coordinateNorm"),
    BlockReader = require("./libs/blocksReader");

var canvas = document.getElementById('level-editor'),
    starter = new CanvasStarter(canvas);

// lets draw the lines
starter.drawLines(10, 10);