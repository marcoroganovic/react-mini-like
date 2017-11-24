const path = require("path");

module.exports = {
  entry: "./src/main.js",

  output: {
    filename: "react-like.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loaded: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  }
}
