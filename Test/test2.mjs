const path = require("node:path");
// import * as math from "./math-esm.mjs";
import { add, subtract } from "./math-esm.mjs";
console.log(add(1, 2));
console.log(subtract(1, 2));
console.log("MY Name");
//watch mode --> node --watch fileName
console.log(path.basename(__dirname));
console.log(path.basename(__filename));
