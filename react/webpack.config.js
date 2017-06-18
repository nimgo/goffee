var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

var dist = path.resolve(__dirname, "dist");

module.exports = {
  
  devtool: "eval", // "source-map"

  performance: {
      hints: "warning"
  },
  
  entry: {
    //"webpack-dev-server/client?http://localhost:8080",
    "app": "./src/index.tsx"
  },

  output: {
    filename: "[name].[hash:6].dev.js",
    path: dist
  },
  
  resolve: {
    extensions: [
      ".ts", ".tsx", 
      ".js", ".jsx",
      ".css", ".scss", 
      ".html" ]
  },

  module: {
    rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [ "babel-loader", "awesome-typescript-loader", "source-map-loader" ]
        },
        { 
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [ "babel-loader", "source-map-loader" ]  
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: "style-loader!css-loader"
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [ "style-loader", "css-loader", "sass-loader" ]
        },
        {
          test: /\.html$/,
          use: "raw-loader"
        }
      
    ]
  },

  plugins: [

        // new CleanWebpackPlugin(
        //     [
        //         "./public/assets/css",
        //         "./public/assets/favico",
        //         "./public/assets/fonts",
        //         "./public/assets/imgs",
        //         "./public/assets/js",
        //         "./public/assets"
        //     ],
        //     {
        //         root: dist,
        //         verbose: true
        //     }
        // ),		

        new webpack.optimize.CommonsChunkPlugin(
            {
                name: [ "app" ]
            }
        ),

        new HtmlWebpackPlugin(
            {
                chunks: ["app"],
                template: "./resources/razor/index.html",
                inject: true,
                filename: "./index.html",
            }
        ),

        // new HtmlWebpackPlugin(
        //     {
        //         chunks: ["polyfills", "vendor", "app"],
        //         template: "ngsrc/razor/app.cshtml",
        //         inject: true,
        //         filename: "./index.html",
        //     }
        // ),

        // new CopyWebpackPlugin([
        //     { from: "resources/css/*.*", to: "public/assets/css/", flatten: true },
        //     { from: "resources/fonts/*.*", to: "public/assets/fonts/", flatten: true },
        //     { from: "resources/imgs/*.*", to: "public/assets/imgs/", flatten: true },
        //     { from: "resources/js/*.*", to: "public/assets/js/", flatten: true },
        //     { from: "resources/favicons/*", to: "public/assets/ico", flatten: true },
        //     { from: "node_modules/jquery/dist/jquery.min.js", to: "public/assets/js/", flatten: true }, // because of datepicker
        //     { from: "node_modules/bootstrap/dist/css/bootstrap.min.css.map", to: "public/assets/css/", flatten: true },
        // ])
  ],
  
  devServer: {
    contentBase: dist,
    inline: true,
    port: 3000
  }
};