/**
 * Responsible to place an item inside a certain
 * width x height boxes.
 */

module.exports = function(point, blockWidth, blockHeight){
  return {
    x: point.x - (point.x % blockWidth),
    y: point.y - (point.y % blockHeight)
  };
};