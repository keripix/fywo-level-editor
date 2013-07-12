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

  this.paintedBlocks = [];

  this.activeColor = this.blockColor;
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

GameBlockConfig.prototype.addBlock = function(color) {
  color = color || this.activeKey;
};