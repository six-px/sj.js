"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDateTime = checkDateTime;
exports.getDateTime = getDateTime;

var _moment = _interopRequireDefault(require("moment"));

var _objectProperty = require("./objectProperty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 内部方法
function _getValue(obj, tree) {
  var value = obj; // 如果是对象树

  if (tree) {
    var property = (0, _objectProperty.getObjProperty)(obj, tree);

    if (property === undefined) {
      return false;
    } else {
      value = property;
    }
  }

  return value;
} // 内部方法


function _checkDateTime(value) {
  // 从 2.14.0 版本开始，moment([]) 和 moment({}) 也返回当前时间。
  if ([undefined, null, "", " ", 0].includes(value) || _typeof(value) === "object") {
    return false;
  }

  return (0, _moment["default"])(value).isValid();
} // 检查是不是合法 时间格式


function checkDateTime(obj, tree) {
  var value = _getValue(obj, tree);

  return _checkDateTime(value);
} // 智能安全获取时间
// options:{tree: a.b, format: 'YYYY', none: '-'}
// options:'a.b.c'
// options:'YYYY-MM-DD'
// options:'无'
// options: 'a.b.c','YYY-MM-DD','-'


function getDateTime(obj) {
  for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    options[_key - 1] = arguments[_key];
  }

  var tree,
      format = "YYYY-MM-DD",
      none = "";

  if (Array.isArray(options) && options.length <= 1) {
    options = options[0];
  }

  if (Array.isArray(options)) {
    // 数组参数
    tree = options[0];
    format = options[1] || format;
    none = options[2] || none;
  } else if (_typeof(options) === "object") {
    // 对象参数
    tree = options.tree;
    format = options.format || format;
    none = options.none || none;
  } else if (typeof options === "string") {
    // 字符串猜测参数
    if (/-MM-/.test(options)) {
      format = options; // 如果有 -MM- 猜测是配置 format
    } else if (/\./.test(options)) {
      tree = options; // 如果有点 猜测是 对象树
    } else {
      none = options; // 否则 猜测是 设置 缺省值
    }
  }

  var value = _getValue(obj, tree);

  return _checkDateTime(value) ? (0, _moment["default"])(value).format(format) : none;
}