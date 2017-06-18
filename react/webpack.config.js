var webpack = require('webpack');
var path = require('path');

module.exports = {

  devtool: 'eval',
  
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "./src/index.tsx"
  ],

  output: {
    filename: 'app.js',
    path: path.resolve('dist')
  },
  
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  module: {
    rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
              "babel-loader",
              "awesome-typescript-loader"
              //"source-map-loader"
          ]
        },
        { 
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'        
        }
      
    ]
  },

  plugins: [

  ],
  
  devServer: {
    contentBase: './dist'
  }
};