var path = require('path');
 module.exports = {
     entry: ['babel-polyfill', './js/clientApp.js'],
     output: {
         path: path.resolve(__dirname),
         filename: 'js/clientAppBundle.js'
     },
     devServer: {
         contentBase: '../client'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 exclude: /node_modules/,
                 use: {
                 loader: 'babel-loader'
                }
             }
         ]
     }
 };