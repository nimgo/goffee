var path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

var isProduction = (process.env.NODE_ENV || "development").trim() === "production";

module.exports = {

    entry: {
        "polyfills": "./ngsrc/polyfills.ts",
        "vendor": "./ngsrc/vendor.ts",
        "app": isProduction ? "./ngsrc/startup.aot.ts" : "./ngsrc/startup.ts"
    },

    resolve: {
        extensions: [ ".ts", ".js", ".json", ".css", ".scss", ".html" ]
    },
		
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                exclude: /node_modules/,
                loader: "file-loader?name=assets/[name]-[hash:6].[ext]"
            },
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
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
        exprContextCritical: false
    },

    plugins: [
			
        new CleanWebpackPlugin(
            [
                "./public/assets/css",
                "./public/assets/fonts",
                "./public/assets/js",
                "./public/assets/imgs",
                "./public/assets/ico",
                "./public/assets",
                "./public/dist",
            ],
            {
                root: path.resolve(__dirname , './../webroot'),
                verbose: true
            }
        ),

        new webpack.optimize.CommonsChunkPlugin(
            {
                name: [ "app", "vendor", "polyfills" ]
            }
        ),
				
        new HtmlWebpackPlugin(
            {
                chunks: ["polyfills", "vendor", "app"],
                template: "ngsrc/razor/app.cshtml",
                inject: true,
                filename: "./index.html",
            }
        ),

        new CopyWebpackPlugin([
            { from: "ngsrc/public/css/*.*", to: "public/assets/css/", flatten: true },
            { from: "ngsrc/public/fonts/*.*", to: "public/assets/fonts/", flatten: true },
            { from: "ngsrc/public/imgs/*.*", to: "public/assets/imgs/", flatten: true },
            { from: "ngsrc/public/js/*.*", to: "public/assets/js/", flatten: true },
            { from: "ngsrc/public/favicons/*", to: "public/assets/ico", flatten: true },
            { from: "node_modules/jquery/dist/jquery.min.js", to: "public/assets/js/", flatten: true }, // because of datepicker
            { from: "node_modules/bootstrap/dist/css/bootstrap.min.css.map", to: "public/assets/css/", flatten: true },
        ])
    ]
}