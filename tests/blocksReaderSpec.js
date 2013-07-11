var Reader = require("./../libs/blocksReader"),
    Canvas = require("canvas"),
    canvas,
    blocks;

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
      {x: 25, y: 0, width: 10, height: 10},
      {x: 10, y: 10, width: 10, height: 10},
      {x: 40, y: 10, width: 10, height: 10},
      {x: 0, y: 20, width: 10, height: 10},
      {x: 0, y: 40, width: 10, height: 10},
      {x: 10, y: 40, width: 10, height: 10}
    ];
    drawBlocks(canvas, blocks);
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

    var reader = new Reader({blockWidth:1,blockHeight:1}),
        detected = reader.parseLine(data, 1);

    expect(detected[0]).toEqual({x: 0, y: 1, width: 1, height: 1});
    expect(detected[1]).toEqual({x: 2, y: 1, width: 1, height: 1});
    expect(detected[2]).toEqual({x: 5, y: 1, width: 1, height: 1});

    expect(detected.length).toEqual(3);
  });

  // it("Should Parse each line correctly with blockWidth = 2", function(){
  //   var data = [
  //     0,0,0,0,0,0,0,0,
  //     1,1,1,1,1,1,1,1,
  //     1,1,1,1,1,1,1,1,
  //     1,2,3,0,1,2,3,0,
  //     5,5,5,5,5,5,5,5,
  //     0,0,0,0,0,0,0,0
  //   ];

  //   var reader = new Reader({blockWidth:2}),
  //       detected = reader.parseLine(data, 1);

  //   expect(detected[0]).toEqual({x: 0, y: 10, width: 10, height: 10});
  //   expect(detected[1]).toEqual({x: 20, y: 10, width: 10, height: 10});
  //   expect(detected[2]).toEqual({x: 50, y: 10, width: 10, height: 10});

  //   expect(detected.length).toEqual(3);
  // });

  // it("Should detect the blocks", function(){
  //   var reader = new Reader({blockWidth:10}),
  //       detected = reader.read(canvas);
  //   expect(detected).toEqual(blocks);
  // });
});