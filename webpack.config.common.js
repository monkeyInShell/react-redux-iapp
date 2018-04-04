/**
 * Created by ink on 2018/4/4.
 */
const path = require('path')
let contentPath, publicPath, entry
entry = {
  'components/index': ['./client/pages/example/index.js']
}
if (process.env.NODE_ENV === 'local') {
  contentPath = path.resolve(__dirname, 'public')
  publicPath = '/'
  Object.keys(entry).forEach((item, index) => {
    entry[item].unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true')
  })
} else {
  contentPath = path.resolve(__dirname, 'dist/public/mapping')
  publicPath = '/mapping/'
}
const config = {
  entry,
  target: 'web',
  output: {
    path: contentPath,
    publicPath,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'client'),
      path.resolve(__dirname, 'server')
    ]
  },
}
module.exports = config
