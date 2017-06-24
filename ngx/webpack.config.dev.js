var webpack = require("webpack");

var path = require('path');
var dist = path.resolve(__dirname, "dist");

module.exports = {

    devtool: "eval", // "source-map"

    performance: {
        hints: "warning"
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
    }
}