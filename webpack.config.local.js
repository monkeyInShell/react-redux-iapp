/**
 * Created by ink on 2018/3/29.
 */
const path = require('path')
const webpack = require('webpack')
const contentPath = path.resolve(__dirname, 'public')
const commonConfig = require('./webpack.config.common')
const publicPath = '/'
const copyEntry = Object.assign({}, commonConfig.entry)
const entry = {}
Object.keys(copyEntry).map(item => {
  let temp = [...copyEntry[item]]
  temp.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true')
  entry[item] = temp
})
console.log('读取webpack devConfig')
const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry,
  target: commonConfig.target,
  output: Object.assign({}, commonConfig.output, {
    path: contentPath,
    publicPath,
  }),
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, ...commonConfig.module.rules]
  },
  resolve: commonConfig.resolve,
  watchOptions: {
    aggregateTimeout: 400,
    poll: 1000,
    ignored: /node_modules/
  },
  devServer: {
    hot: true,
    host: '127.0.0.1',
    port: '8888',
    disableHostCheck: true,
    contentBase: [contentPath],
    historyApiFallback: true,
    stats: 'minimal'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('local')
    }),
    ...commonConfig.plugins
  ]
}
module.exports = config
