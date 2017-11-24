const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "react-like.js",
    path: path.resolve(__dirname, "dist")
  }
}
