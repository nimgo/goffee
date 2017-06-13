var path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

console.log("------------------------------------------------------");
console.log("BUILDING: DEVELOPMENT MODE");
console.log("------------------------------------------------------");

module.exports = {

    devtool: "source-map",

    performance: {
        hints: true
    },

    entry: {
        "polyfills": "./ngapp/polyfills.ts",
        "vendor": "./ngapp/vendor.ts",
        "app": "./ngapp/startup.ts"
    },

    output: {
        path: "./../public/",
        filename: "dist/[name].[hash:6].dev.js",
        publicPath: "/"
    },

    resolve: {
        extensions: [ ".ts", ".js", ".json", ".css", ".scss", ".html" ]
    },

    // webpack-devserver
    devServer: {
        historyApiFallback: true,
        stats: "minimal",
        outputPath: path.join(__dirname, "./../public")
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                //exclude: /node_modules/,
                loaders: [
                    "awesome-typescript-loader",
                    "angular2-template-loader",
                    "angular-router-loader",
                    "source-map-loader"
                ]
            },
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
            }
        ],
        exprContextCritical: false
    },

    plugins: [
        new CleanWebpackPlugin(
            [
                "./../public/css",
                "./../public/dist",
                "./../public/fonts",
                "./../public/assets",
            ]
        ),

        new webpack.optimize.CommonsChunkPlugin(
            {
                name: [ "app", "vendor", "polyfills" ]
            }
        ),

        new HtmlWebpackPlugin(
            {
                chunks: ["polyfills", "vendor", "app"],
                template: "ngapp/razor/App.cshtml",
                inject: true,
                filename: "./../public/app.html"
            }
        ),

        new HtmlWebpackPlugin(
            {
                chunks: ["polyfills", "vendor", "app"],
                template: "ngapp/razor/Admin.cshtml",
                inject: true,
                filename: "./../public/admin/index.html",
            }
        ),

        new CopyWebpackPlugin([
            { from: "ngapp/public/css/*.css", to: "css/", flatten: true },
            { from: "ngapp/public/fonts/*.*", to: "fonts/", flatten: true },
            { from: "ngapp/public/imgs/*.*", to: "imgs/", flatten: true },
            { from: "ngapp/public/js/*.js", to: "js/", flatten: true },
            { from: "ngapp/public/favicons/*", to: "", flatten: true },
            { from: "node_modules/jquery/dist/jquery.min.js", to: "js/", flatten: true }, // because of datepicker
            { from: "node_modules/bootstrap/dist/css/bootstrap.min.css.map", to: "css/", flatten: true },
        ])
    ]
}