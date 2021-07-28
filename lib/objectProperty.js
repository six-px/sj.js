"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkObjProperty = checkObjProperty;
exports.getObjProperty = getObjProperty;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 检查对象是否有属性 a.b.c
function checkObjProperty(obj, tree) {
  return _checkObjProperty(obj, tree).is;
} // 安全获取对象属性 a.b.c


function getObjProperty(obj, tree) {
  return _checkObjProperty(obj, tree).property;
} // 内部方法


function _checkObjProperty(obj, tree) {
  if (!obj || obj == "undefined" || obj == undefined || _typeof(obj) !== "object" || Array.isArray(obj)) {
    return {
      is: false
    };
  }

  var arr = tree.split(".");
  var tempObj = obj;

  for (var i = 0; i < arr.length; i++) {
    if (tempObj[arr[i]] == undefined) {
      return {
        is: false
      };
    } else {
      tempObj = tempObj[arr[i]];
    }
  }

  return {
    is: true,
    property: tempObj
  };
}