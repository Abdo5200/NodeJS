const add = (x, y) => {
  return x + y;
};
const subtract = (x, y) => {
  return x - y;
};
//*first pattern
// module.exports = { add: add, subtract: subtract };
//*second pattern
// module.exports = {add,subtract};
//*third pattern
/*
module.exports.add = (x, y) => {
  return x + y;
};
module.exports.subtract = (x, y) => {
  return x - y;
};
*/
//*fourth pattern
/*exports.add = (x, y) => {
  return x + y;
};
exports.subtract = (x, y) => {
  return x - y;
};
*/
// const addPro = console.log("HI");
module.exports.addPro = add;
