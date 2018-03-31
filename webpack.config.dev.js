/**
 * Created by ink on 2018/3/29.
 */
const path = require('path')
const webpack = require('webpack')
const contentPath = path.resolve(__dirname, 'public')
const config = {
  mode: 'development',
  devtool: "eval-source-map",
  entry: {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true', './client/index.js']
  },
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
    stats: "minimal"
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    //new HtmlWebpackPlugin({
    //  title: '服务端渲染',
    //  filename: `${contentPath}/ssr.html`,
    //  template: './server/views/index.hbs',
    //  chunks: ['index']
    //})
  ]
}
module.exports = config