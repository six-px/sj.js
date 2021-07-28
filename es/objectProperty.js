// 检查对象是否有属性 a.b.c
export function checkObjProperty(obj, tree) {
  return _checkObjProperty(obj, tree).is;
} // 安全获取对象属性 a.b.c

export function getObjProperty(obj, tree) {
  return _checkObjProperty(obj, tree).property;
} // 内部方法

function _checkObjProperty(obj, tree) {
  if (!obj || obj == "undefined" || obj == undefined || typeof obj !== "object" || Array.isArray(obj)) {
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