var webpack = require("webpack");

var path = require('path');
var dist = path.resolve(__dirname, "dist");

module.exports = {

	devtool: "source-map", //"eval",

	performance: {
		hints: "warning"
	},

  entry: {
    "app": "./src/startup.ts",
    "vendor": "./src/vendor.ts",
    "polyfills": "./src/polyfills.ts"
  },

	output: {
		filename: "public/[name].[hash:6].dev.min.js",
		path: dist,
		publicPath: "/"
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
						"awesome-typescript-loader",
						"angular2-template-loader",
						"angular-router-loader",
						"source-map-loader"
				]
			}
		]
	},

  devServer: {
    contentBase: dist,
    inline: true,
    port: 3000
  }
}