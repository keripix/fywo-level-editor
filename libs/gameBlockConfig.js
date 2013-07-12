/**
 * Responsible for holding the block configuration used
 * in the level editor.
 */

module.exports = GameBlockConfig;

function GameBlockConfig(conf){
  conf = conf || {};

  this.blockColor = conf.blockColor || "rgb(1,1,1)";
  this.actorColor = conf.actorColor || "rgb(236, 240, 241)";
  this.exitColor = conf.exitColor || "rgb(39, 174, 96)";
  this.keyColor = conf.keyColor || "rgb(231, 76, 60)";

  this.blockWidth = conf.blockWidth || 10;
  this.blockHeight = conf.blockHeight || 10;

  this.activeColor = this.blockColor;
}

GameBlockConfig.prototype.setActiveColor = function(name) {
  if (!this[name]){
    return;
  }

  this.activeColor = this[name];
  console.log(this.activeColor);
};

/**
 * Get the current active color to paint
 * @return {String} RGB string representation
 */
GameBlockConfig.prototype.getActiveColor = function() {
  return this.activeColor;
};