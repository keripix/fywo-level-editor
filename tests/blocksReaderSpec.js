var Reader = require("./../libs/blocksReader"),
    Canvas = require("canvas"),
    reader,
    canvas,
    blocks;

function drawBlocks(canvas, blocks){
  var ctx = canvas.getContext("2d");

  blocks.forEach(function(b){
    ctx.fillStyle = "#000000";
    ctx.fillRect(b.x, b.y, b.width, b.height);
  });
}

describe("Reading Blocks", function(){
  beforeEach(function(){
    canvas = new Canvas(50, 50);
    reader = new Reader(canvas);
    blocks = [
      {x: 0, y: 0, width: 10, height: 10},
      {x: 25, y: 0, width: 10, height: 10},
      {x: 10, y: 10, width: 10, height: 10},
      {x: 40, y: 10, width: 10, height: 10},
      {x: 0, y: 20, width: 10, height: 10},
      {x: 0, y: 40, width: 10, height: 10},
      {x: 10, y: 40, width: 10, height: 10}
    ];

    drawBlocks(canvas, blocks);
  });

  it("Should calculate canvas property", function(){
    expect(reader.canvasWidth).toEqual(50);
    expect(reader.canvasHeight).toEqual(50);
  });

  it("Should Parse each line correctly", function(){
    var data = [
      0,0,0,0,
      1,1,1,1,
      0,0,0,0,
      1,2,3,0,
      5,5,5,5,
      0,0,0,0
    ];

    var detected = reader.parseLine(data, 1);
    expect(detected[0]).toEqual({x: 0, y: 10, width: 10, height: 10});
    expect(detected[1]).toEqual({x: 20, y: 10, width: 10, height: 10});
    expect(detected[2]).toEqual({x: 50, y: 10, width: 10, height: 10});
  });

  // it("Should detect the blocks", function(){
  //   var detected = reader.read();

  //   expect(detected).toEqual(blocks);
  // });
});