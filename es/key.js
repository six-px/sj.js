export function getKey() {
  return "" + parseInt(Math.random() * (99999 - 10000 + 1) + 10000) + parseInt(Math.random() * (999 - 100 + 1) + 100);
}
export function setKey(arr) {
  return arr.map(function (v) {
    v.key = getKey();
    return v;
  });
}