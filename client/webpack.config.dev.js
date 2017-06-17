var webpack = require("webpack");
var merge = require('webpack-merge');

var commons = require("./webpack.config.common.js");

module.exports = merge(commons, {

    devtool: "source-map",

    performance: {
        hints: true
    },

    output: {
        path: "./../webroot",
        filename: "public/dist/[name].[hash:6].dev.js",
        publicPath: "/"
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
            }
        ]
    },
})