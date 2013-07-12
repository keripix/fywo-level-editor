var Reader = require("./../libs/blocksReader"),
    Canvas = require("canvas"),
    Cfg = require("./../libs/gameBlockConfig"),
    cfg = new Cfg(),
    canvas,
    blocks
;
function drawBlocks(canvas, blocks){
  var ctx = canvas.getContext("2d");
  // draw the background color first
  ctx.fillStyle = "#F1C40F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";
  blocks.forEach(function(b){
    ctx.fillRect(b.x, b.y, b.width, b.height);
  });
}

describe("Reading Blocks", function(){
  beforeEach(function(){
    canvas = new Canvas(50, 50);
    blocks = [
      {x: 0, y: 0, width: 10, height: 10},
      {x: 20, y: 0, width: 10, height: 10},
      {x: 10, y: 10, width: 10, height: 10},
      {x: 40, y: 10, width: 10, height: 10},
      {x: 0, y: 20, width: 10, height: 10},
      {x: 0, y: 40, width: 10, height: 10},
      {x: 10, y: 40, width: 10, height: 10}
    ];
    cfg.blockHeight = 10;
    cfg.blockWidth = 10;
  });

  it("Should Parse each line correctly with blockWidth = 1", function(){
    var data = [
      0,0,0,0,
      1,1,1,1,
      0,0,0,0,
      1,2,3,0,
      5,5,5,5,
      0,0,0,0
    ];
    cfg.blockWidth = 1;
    cfg.blockHeight = 1;
    var reader = new Reader(cfg);

    reader.parseLine(data, 0);

    var detected = reader.detected;

    expect(detected[0]).toEqual({x: 0, y: 0, width: 1, height: 1});
    expect(detected[1]).toEqual({x: 2, y: 0, width: 1, height: 1});
    expect(detected[2]).toEqual({x: 5, y: 0, width: 1, height: 1});

    expect(detected.length).toEqual(3);
  });

  it("Should Parse each line correctly with blockWidth = 2", function(){
    var data = [
      0,0,0,0,0,0,0,0,
      1,1,1,1,1,1,1,1,
      0,0,0,0,0,0,0,0,
      1,2,3,0,1,2,3,0,
      5,5,5,5,5,5,5,5,
      0,0,0,0,0,0,0,0
    ];
    cfg.blockWidth = 2;
    cfg.blockHeight = 2;
    var reader = new Reader(cfg);

    reader.parseLine(data, 1);

    var detected = reader.detected;

    expect(detected[0]).toEqual({x: 0, y: 2, width: 2, height: 2});
    expect(detected[1]).toEqual({x: 4, y: 2, width: 2, height: 2});
    expect(detected[2]).toEqual({x: 10, y: 2, width: 2, height: 2});

    expect(detected.length).toEqual(3);
  });

  it("Should detect the blocks", function(){
    drawBlocks(canvas, blocks);

    var reader = new Reader(cfg);

    reader.read(canvas);

    expect(reader.detected).toEqual(blocks);
  });
});