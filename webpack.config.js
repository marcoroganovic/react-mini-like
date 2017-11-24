const path = require("path");

module.exports = {
  entry: "./src/main.js",

  output: {
    filename: "react-like.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: "babel-loader"
      }
    ]
  }
}
