var webpack = require('webpack');

var path = require('path');
var dist = path.resolve(__dirname, "dist");

module.exports = {

  devtool: "source-map", //"eval",
  //devtool: "source-map",

  performance: {
		hints: false //"warning"
  },

  output: {
    filename: "scripts/[name].[hash:6].dev.min.js",
    path: dist
  },

  devServer: {
    contentBase: dist,
    inline: true,
    port: 5000
  }
}
