const path = require("path");
//this gives the path of the directory the contains the folder that file is stored at
module.exports = path.dirname(require.main.filename);
