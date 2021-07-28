"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKey = getKey;
exports.setKey = setKey;

function getKey() {
  return "".concat(parseInt(Math.random() * (99999 - 10000 + 1) + 10000)).concat(parseInt(Math.random() * (999 - 100 + 1) + 100));
}

function setKey(arr) {
  return arr.map(function (v) {
    v.key = getKey();
    return v;
  });
}