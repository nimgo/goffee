var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var path = require("path");
var dist = path.resolve(__dirname, "dist");

var environment = (process.env.NODE_ENV || "development").trim();
var production = environment === "production";
console.log("------------------------------------------------------");
console.log("Build: ", environment.toUpperCase());
console.log("------------------------------------------------------");

var commons = {

  performance: {
    hints: false
  },

  entry: {
    "app": production ? "./src/startup.aot.ts" : "./src/startup.ts",
    "vendor": "./src/vendor.ts",
    "polyfills": "./src/polyfills.ts"
  },

	resolve: {
		extensions: [
			".ts", ".js",
			".json",
			".css", ".scss",
			".html"
		]
	},

	module: {
		rules: [
			{
					test: /\.css$/,
					exclude: /node_modules/,
					loader: "style-loader!css-loader"
			},
			{
					test: /\.scss$/,
					exclude: /node_modules/,
					loaders: [ "style-loader", "css-loader", "sass-loader" ]
			},
			{
					test: /\.html$/,
					loader: "raw-loader"
			}
			// {
			//     test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
			//     exclude: /node_modules/,
			//     loader: "file-loader?name=assets/[name]-[hash:6].[ext]"
			// }
		]
	},

	plugins: [

		new HtmlWebpackPlugin(
			{
					chunks: ["app", "vendor", "polyfills"],
					template: "./resources/razor/index.html",
					inject: true,
					filename: "./index.html",
			}
		),

		new CopyWebpackPlugin([
			{ from: "resources/css/*.*", to: "static/css/", flatten: true },
			{ from: "resources/fonts/*.*", to: "static/fonts/", flatten: true },
			{ from: "resources/imgs/*.*", to: "static/imgs/", flatten: true },
			{ from: "resources/js/*.*", to: "static/js/", flatten: true },
			{ from: "resources/favicons/*", to: "static/favico", flatten: true },
			// { from: "node_modules/jquery/dist/jquery.min.js", to: "public/assets/js/", flatten: true }, // because of datepicker
			// { from: "node_modules/bootstrap/dist/css/bootstrap.min.css.map", to: "public/assets/css/", flatten: true },
		])
	]
};

var configs = { };
if (environment === "development") {
  configs = require("./webpack.config.dev.js");
} else {
  configs = require("./webpack.config.prod.js");
}

var merge = require('webpack-merge');
module.exports = merge(commons, configs);