(function() {

  // 将 this 赋值给局部变量 root
  // root 的值, 客户端为 "window"
	var root = this;

  // 核心函数 "_" 其实是一个构造函数 无 new 调用的构造函数
  // 将传入的参数（实际要操作的数据）赋值给 this._wrapped 属性
  // OOP 调用时，_ 相当于一个构造函数
	var _ = function(obj) {
    if (obj instanceof _)
      return obj;
    if (!(this instanceof _))
      return new _(obj);
    this._wrapped = obj;
  };

  // 将原来全局环境中的变量 `_` 赋值给变量 previousUnderscore 进行缓存
  // 在后面的 noConflict 方法中有用到
  var previousUnderscore = root._;

  // 缓存变量, 便于压缩代码
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // 缓存变量, 便于压缩代码
  // 同时可减少在原型链中的查找次数(提高代码效率)
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // ES5 原生方法, 如果浏览器支持, 则 underscore 中会优先使用
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // 将上面定义的 `_` 局部变量赋值给全局对象中的 `_` 属性
  // 即客户端中 window._ = _
  // 这样暴露给全局后便可以在全局环境中使用 `_` 变量(方法)
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Math.pow(2, 53) - 1 是 JavaScript 中能精确表示的最大数字
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  // 返回一个 [min, max] 范围内的任意整数
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
  // Underscore并没有在原生的JavaScript对象原型中进行扩展，而是像jQuery一样，将数据封装在一个自定义对象中（下文中称“Underscore对象”）。
  // 你可以通过调用一个Underscore对象的value()方法来获取原生的JavaScript数据
  _.prototype.value = function() {
    return this._wrapped;
  };

  var property = function(key) {
    return function(obj){
      return obj == null ? void 0 : obj[key]
    }
  }
  // 该函数传入一个参数，返回参数的 length 属性值
  // 用来获取 array(数组) 以及 arrayLike(类数组) 元素的 length 属性值
  var getLength = property('length');
  _.getLength = getLength;

  // 判断是否是 ArrayLike Object
  // 数组 类数组，即拥有 length 属性并且 length 属性值为 Number 类型的元素
  // 包括数组、arguments、HTML Collection 以及 NodeList 等等 包括字符串、函数等
  var isArrayLike = function(collection) {
    // 返回参数 collection 的 length 属性值
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };
  _.isArrayLike = isArrayLike;
  // 返回一个函数，这个函数返回任何传入的对象的key属性值。
  _.property = property;
}.call(this))