/**
 * Created by ink on 2018/3/29.
 */
import express from 'express'
import {renderToString} from 'react-dom/server'
import path from 'path'
import App from '../client/App'
import React from 'react'
const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.use(express.static(path.resolve(__dirname, '../public')))

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev')
  const webpack = require('webpack')
  const compiler = webpack(config)
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: true
  }))
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000
  }))
}
app.use((req, res, next) => {
  const content = renderToString(<App/>)
  res.render('index', {
    app: content
  })
})
export default app
