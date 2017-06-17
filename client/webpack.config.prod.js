var webpack = require("webpack");
var merge = require("webpack-merge");

var commons = require("./webpack.config.common.js");

module.exports = merge(commons, {

    performance: {
        hints: false
    },

    output: {
        path: "./../webroot",
        filename: "public/dist/[name].[hash:6].prod.min.js",
        publicPath: "/"
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                //exclude: /node_modules/,
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
})