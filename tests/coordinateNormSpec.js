var coordinateNorm = require("./../libs/coordinateNorm"),
    cn = new coordinateNorm();

describe("Coordinate Norm", function(){
  it("Should normalize any position relative to the box top and left coordinates", function(){

    // 10
    expect(cn.normalize({x: 5, y: 5}, 10, 10)).toEqual({x: 0, y: 0});
    expect(cn.normalize({x: 10, y: 10}, 10, 10)).toEqual({x: 10, y: 10});
    expect(cn.normalize({x: 25, y: 35}, 10, 10)).toEqual({x: 20, y: 30});

    // 20
    expect(cn.normalize({x: 5, y: 5}, 20, 20)).toEqual({x: 0, y: 0});
    expect(cn.normalize({x: 30, y: 30}, 20, 20)).toEqual({x: 20, y: 20});
    expect(cn.normalize({x: 65, y: 85}, 20, 20)).toEqual({x: 60, y: 80});
  });
});