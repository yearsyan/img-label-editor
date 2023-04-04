const { merge } = require('webpack-merge');
const base = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify('development'),
    }),
  ]
})