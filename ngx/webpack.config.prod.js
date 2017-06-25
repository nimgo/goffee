var webpack = require('webpack');
var CleanWebpackPlugin = require("clean-webpack-plugin");

var path = require('path');
var dist = path.resolve(__dirname, "dist");

module.exports = {

  entry: {
    "app": "./src/startup.aot.ts",
    "vendor": "./src/vendor.ts",
    "polyfills": "./src/polyfills.ts"
  },

	output: {
		filename: "scripts/[name].[hash:6].prod.min.js",
		path: dist
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
						"awesome-typescript-loader",
						"angular2-template-loader",
						"angular-router-loader?aot=true&genDir=gen/ngfactory"
				]
			}
		]
	},

	plugins: [

		new webpack.NoErrorsPlugin(),

		new webpack.optimize.CommonsChunkPlugin(
			{
					name: [ "app", "vendor", "polyfills" ]
			}
		),

		new CleanWebpackPlugin(
			[
				"./assets/css",
				"./assets/favico",
				"./assets/fonts",
				"./assets/imgs",
				"./assets/js",
				"./assets",
				"./*",
			],
			{
				root: dist,
				verbose: true
			}
		),

		new webpack.optimize.UglifyJsPlugin(
			{
				compress: {
					warnings: false
				},
				output: {
					comments: false
				},
				sourceMap: {
					warnings: false
				}
			}
		),
	]
}