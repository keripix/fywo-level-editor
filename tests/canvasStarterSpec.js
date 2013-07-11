var c = require("./../libs/canvasStarter"),
    Canvas = require("canvas"),
    canvas = new Canvas(100,100),
    ctx = canvas.getContext("2d");

c(canvas, 10, 10);

describe("Start Canvas", function(){
  it("Should draw vertical lines according to xGridSpacing", function(){
    expect(ctx.getImageData(10, 12, 1, 1).data[0]).toEqual(231);
    expect(ctx.getImageData(10, 12, 1, 1).data[1]).toEqual(75);
    expect(ctx.getImageData(10, 12, 1, 1).data[2]).toEqual(59);

    expect(ctx.getImageData(20, 22, 1, 1).data[0]).toEqual(231);
    expect(ctx.getImageData(20, 22, 1, 1).data[1]).toEqual(75);
    expect(ctx.getImageData(20, 22, 1, 1).data[2]).toEqual(59);

    expect(ctx.getImageData(30, 32, 1, 1).data[0]).toEqual(231);
    expect(ctx.getImageData(30, 32, 1, 1).data[1]).toEqual(75);
    expect(ctx.getImageData(30, 32, 1, 1).data[2]).toEqual(59);
  });

  it("Should draw horizontal lines according to yGridSpacing", function(){
    expect(ctx.getImageData(12, 10, 1, 1).data[0]).toEqual(231);
    expect(ctx.getImageData(12, 10, 1, 1).data[1]).toEqual(75);
    expect(ctx.getImageData(12, 10, 1, 1).data[2]).toEqual(59);

    expect(ctx.getImageData(22, 20, 1, 1).data[0]).toEqual(231);
    expect(ctx.getImageData(22, 20, 1, 1).data[1]).toEqual(75);
    expect(ctx.getImageData(22, 20, 1, 1).data[2]).toEqual(59);

    expect(ctx.getImageData(32, 30, 1, 1).data[0]).toEqual(231);
    expect(ctx.getImageData(32, 30, 1, 1).data[1]).toEqual(75);
    expect(ctx.getImageData(32, 30, 1, 1).data[2]).toEqual(59);
  });
});