/**
 * Created by ink on 2018/3/29.
 */
const path = require('path')
const webpack = require('webpack')
const contentPath = path.resolve(__dirname, 'dist/public/mapping')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractCssChunks = require('extract-text-webpack-plugin')
const publicPath = '/mapping/'
const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    'components/index': ['./client/index.js']
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
      use: ExtractCssChunks.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ManifestPlugin({
      fileName: 'mapping.json'
    }),
    new ExtractCssChunks({
      filename: '[name].[id].css'
    })
  ]
}
module.exports = config
