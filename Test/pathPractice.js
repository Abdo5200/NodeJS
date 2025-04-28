const path = require("path");
// console.log(path.basename(__dirname));
// console.log(path.basename(__filename));
// console.log(path.extname(__dirname));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
// console.log(path.isAbsolute(__filename));
console.log(path.resolve("folder1", "folder", "index.html"));
console.log(path.resolve("/folder1", "folder", "index.html"));
//when resolve finds // it conseders the folder is the root and omits the previous
console.log(path.resolve("/folder1", "//folder", "index.html"));
console.log(path.resolve("/folder1", "//folder", "../index.html"));
console.log(path.resolve(__dirname, "index.html"));
console.log("that's the end");
