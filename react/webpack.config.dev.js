var webpack = require('webpack');

var path = require('path');
var dist = path.resolve(__dirname, "dist");

module.exports = {

  devtool: "eval", // "source-map"
  //devtool: "source-map",

  performance: {
      hints: "warning"
  },

  output: {
    filename: "[name].[hash:6].dev.min.js",
    path: dist
  },
  
}
