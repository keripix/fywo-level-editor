var c = require("./../libs/canvasStarter"),
    Canvas = require("canvas"),
    canvas = new Canvas(100,100),
    ctx = canvas.getContext("2d");

c(canvas, 10, 10);

describe("Start Canvas", function(){
  it("Should draw vertical lines according to xGridSpacing", function(){
    expect(ctx.getImageData(10, 10, 1, 1).data[0]).toEqual(231);
    expect(ctx.getImageData(10, 10, 1, 1).data[1]).toEqual(75);
    expect(ctx.getImageData(10, 10, 1, 1).data[2]).toEqual(59);
  });
});