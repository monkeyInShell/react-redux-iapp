/**
 * Created by ink on 2018/3/29.
 */
const path = require('path')
const webpack = require('webpack')
const contentPath = path.resolve(__dirname, 'public')
const publicPath = '/'
const ManifestPlugin = require('webpack-manifest-plugin')
const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    'components/index': ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true', './client/pages/example/index.js']
  },
  target: 'web',
  output: {
    path: contentPath,
    publicPath,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: '/\.jsx?$/',
      exclude: /node_modules/,
      use: ['eslint-loader']
    }, {
      test: /\.jsx?$/,
      use: ['babel-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.(png|jpg|gif)$/,
      use: ['url-loader']
    }]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'client'),
      path.resolve(__dirname, 'server')
    ]
  },
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
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ManifestPlugin({
      fileName: 'mapping.json'
    }),
  ]
}
module.exports = config
