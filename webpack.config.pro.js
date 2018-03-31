/**
 * Created by ink on 2018/3/29.
 */
const path = require('path')
const webpack = require('webpack')
const contentPath = path.resolve(__dirname, 'dist/public/mapping')
const config = {
  mode: 'production',
  devtool: "source-map",
  entry: {
    index: ['./client/index.js']
  },
  target: 'web',
  output: {
    path: contentPath,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader']
    }]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'client'),
      path.resolve(__dirname, 'server')
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
module.exports = config