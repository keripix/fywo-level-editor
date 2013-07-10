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

  it("Should detect the blocks", function(){
    var detected = reader.read();

    expect(detected).toEqual(blocks);
  });
});