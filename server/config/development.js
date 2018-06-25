'use strict';
require('babel-register')({
  'plugins': [
    [
      'babel-plugin-transform-require-ignore',
      {
        extensions: ['.less']
      }
    ],
    'dynamic-import-node'
  ]
})
const injectDevelopmentTools = (app) => {
  const config = require('../../webpack.config.dev.babel')
  const webpack = require('webpack')
  const compiler = webpack(config)
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 2000
  }))
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: true
  }))
  return '本地开发链接webpack与node服务'
}
module.exports = {
  env: 'development',
  port: '8888',
  ip: '0.0.0.0',
  injectDevelopmentTools
}
