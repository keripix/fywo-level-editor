/**
 * Responsible to place an item inside a certain
 * width x height boxes.
 */

module.exports = CoordinateNorm;

function CoordinateNorm(){}

CoordinateNorm.prototype.normalize = function(point, blockWidth, blockHeight) {
  return {
    x: point.x - (point.x % blockWidth),
    y: point.y - (point.y % blockHeight)
  };
};