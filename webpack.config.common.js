/**
 * Created by ink on 2018/4/4.
 */
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
//这里可以路径前一个名称作为页面区分
const entry = {
  'components/index': ['./client/pages/example/index.js'],
  'integration/index': ['./client/pages/integration/index.js']
}
const rules = [{
  enforce: 'pre',
  test: '/\.jsx?$/',
  exclude: /node_modules/,
  use: ['eslint-loader']
}, {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ['babel-loader']
}, {
  test: /\.(png|jpg|gif)$/,
  use: ['url-loader']
}]
const plugins = [
  new ManifestPlugin({
    fileName: 'mapping.json'
  })
]
const config = {
  entry,
  target: 'web',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    libraryTarget: 'umd'
  },
  module: {
    rules
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'client'),
      path.resolve(__dirname, 'server')
    ]
  },
  plugins,
}
module.exports = config
