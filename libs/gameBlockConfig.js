/**
 * Responsible for holding the block configuration used
 * in the level editor.
 */

module.exports = GameBlockConfig;

function GameBlockConfig(conf){
  conf = conf || {};

  this.blocksColor = conf.blocksColor || "#010101";
  this.actorColor = conf.actorColor || "#ECF0F1";
  this.exitColor = conf.exitColor || "#27AE60";
  this.keyColor = conf.keyColor || "#E74C3C";

  this.blockWidth = conf.blockWidth || 10;
  this.blockHeight = conf.blockHeight || 10;

  this.paintedBlocks = {
    blocks: [],
    actor: [],
    exit: [],
    key: []
  };

  this.activeColor = this.blocksColor;
  this.activeKey = "blocksColor";
}

GameBlockConfig.prototype.setActiveColor = function(name) {
  if (!this[name]){
    return;
  }

  this.activeColor = this[name];
  this.activeKey = name;
};

/**
 * Get the current active color to paint
 * @return {String} RGB string representation
 */
GameBlockConfig.prototype.getActiveColor = function() {
  return this.activeColor;
};

GameBlockConfig.prototype.addBlock = function(color, points) {
  color = color || this.activeKey;

  var name = color.replace("Color", "");

  if (!this.paintedBlocks[name]){
    return;
  }

  // dont paint if block already existed on the same point
  if (this.blockExist(name, points)){
    return;
  }

  this.paintedBlocks[name].push({
    x: points.x,
    y: points.y,
    width: this.blockWidth,
    height: this.blockHeight,
    color: this[color]
  });
};

GameBlockConfig.prototype.blockExist = function(name, points){
  var found = false;

  this.paintedBlocks[name].forEach(function(item){
    if (item.x === points.x && item.y === points.y){
      found = true;
      return;
    }
  });

  return found;
};

GameBlockConfig.prototype.deletePaintedBlockItem = function(name, points) {
  for (var i = this.paintedBlocks[name].length - 1; i >= 0; i--) {
    if (this.paintedBlocks[name][i].x === points.x && this.paintedBlocks[name][i].y === points.y){
      this.paintedBlocks[name].splice(i, 1);
    }
  }
};

/**
 * Delete any blocks on this position
 * @param  {Object} points Coordinate
 */
GameBlockConfig.prototype.deleteBlock = function(points) {
  // iterate on blocks
  this.deletePaintedBlockItem("blocks", points);
  // iterate on actor
  this.deletePaintedBlockItem("actor", points);
  // iterate on key
  this.deletePaintedBlockItem("key", points);
  // iterate on exit
  this.deletePaintedBlockItem("exit", points);
};