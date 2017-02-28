(function() {
	var root = this;
	var _ = function(obj) {
    if (obj instanceof _)
      return obj;
    if (!(this instanceof _))
      return new _(obj);
    this._wrapped = obj;
  };
  
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
}.call(this))