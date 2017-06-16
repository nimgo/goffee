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
        path: "./../webroot",
        filename: "public/dist/[name].[hash:6].dev.js",
        publicPath: "/"
    },

    resolve: {
        extensions: [ ".ts", ".js", ".json", ".css", ".scss", ".html" ]
    },

    // // webpack-devserver (nodejs express)
    // devServer: {
    //     historyApiFallback: true,
    //     stats: "minimal",
    //     outputPath: path.join(__dirname, "./../webroot/public")
    // },

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
                "public/assets/css",
                "public/assets/fonts",
                "public/assets/js",
                "public/assets/imgs",
                "public/assets/ico",
                "public/assets",
                "public/dist",
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
                template: "ngapp/razor/App.cshtml",
                inject: true,
                filename: "./index.html"
            }
        ),

        new CopyWebpackPlugin([
            { from: "ngapp/public/css/*.css", to: "public/assets/css/", flatten: true },
            { from: "ngapp/public/fonts/*.*", to: "public/assets/fonts/", flatten: true },
            { from: "ngapp/public/imgs/*.*", to: "public/assets/imgs/", flatten: true },
            { from: "ngapp/public/js/*.js", to: "public/assets/js/", flatten: true },
            { from: "ngapp/public/favicons/*", to: "public/assets/favico/", flatten: true },
            { from: "node_modules/jquery/dist/jquery.min.js", to: "public/assets/js/", flatten: true }, // because of datepicker
            { from: "node_modules/bootstrap/dist/css/bootstrap.min.css.map", to: "public/assets/css/", flatten: true },
        ])
    ]
}