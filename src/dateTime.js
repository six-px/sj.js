import moment from "moment";
import {getObjProperty} from './objectProperty'

// 内部方法
function _getValue(obj, tree) {
  let value = obj;
  // 如果是对象树
  if (tree) {
    const property = getObjProperty(obj, tree);
    if (property === undefined) {
      return false;
    } else {
      value = property;
    }
  }
  return value;
}

// 内部方法
function _checkDateTime(value) {
  // 从 2.14.0 版本开始，moment([]) 和 moment({}) 也返回当前时间。
  if (
    [undefined, null, "", " ", 0].includes(value) ||
    typeof value === "object"
  ) {
    return false;
  }

  return moment(value).isValid();
}

// 检查是不是合法 时间格式
export function checkDateTime(obj, tree) {
  const value = _getValue(obj, tree);
  return _checkDateTime(value);
}

// 智能安全获取时间
// options:{tree: a.b, format: 'YYYY', none: '-'}

// options:'a.b.c'
// options:'YYYY-MM-DD'
// options:'无'

// options: 'a.b.c','YYY-MM-DD','-'
export function getDateTime(obj, ...options) {
  let tree,
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
  } else if (typeof options === "object") {
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

  const value = _getValue(obj, tree);
  return _checkDateTime(value) ? moment(value).format(format) : none;
}
