/**
 * Created by ink on 2018/3/29.
 */
import express from 'express'
import {renderToString} from 'react-dom/server'
import path from 'path'
import App from '../client/pages/example/App'
import React from 'react'
import extractMapping from './middleware/extractMapping'
import mapAssets from './utils/mapAssets'
import {StaticRouter} from 'react-router'
const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.use(express.static(path.resolve(__dirname, '../public')))

if (process.env.NODE_ENV === 'local') {
  const config = require('../webpack.config.local')
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
}

//以路径名称作为页面区分

app.use('/components', extractMapping, (req, res, next) => {
  console.log(req.url)
  //可以根据路径，针对某一个页面进行服务端渲染
  const content = renderToString(<StaticRouter
    location={req.url}
    context={{}}
    basename="/components">
    <App/>
  </StaticRouter>)
  res.render('components', {
    app: content,
    links: mapAssets('components/index.css'),
    scripts: mapAssets('components/index.js')
  })
})
app.use('/integration', extractMapping, (req, res, next) => {
  res.render('integration', {
    links: mapAssets('integration/index.css'),
    scripts: mapAssets('integration/index.js')
  })
})
export default app
