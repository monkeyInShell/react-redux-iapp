/**
 * Created by ink on 2018/3/29.
 */
const path = require('path')
const webpack = require('webpack')
const contentPath = path.resolve(__dirname, 'dist/public/mapping')
//extract-text-webpack-plugin 还是beta版有bug，不同入口的css内容都一样
const ExtractCssChunks = require('extract-text-webpack-plugin')
const publicPath = '/mapping/'
const commonConfig = require('./webpack.config.common.babel')
console.log('读取webpack production')
const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: commonConfig.entry,
  output: Object.assign({}, commonConfig.output, {
    path: contentPath,
    publicPath,
  }),
  module: {
    rules: [{
      test: /\.less$/,
      use: ExtractCssChunks.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
    }, ...commonConfig.module.rules]
  },
  resolve: commonConfig.resolve,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractCssChunks({
      filename: '[name].[id].css',
      allChunks: true
    }),
    ...commonConfig.plugins
  ]
}
module.exports = config
