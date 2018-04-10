/**
 * Created by ink on 2018/3/29.
 */
import express from 'express'
import path from 'path'

import React from 'react'
import {renderToString} from 'react-dom/server'

import App from '../client/pages/example/App'
import extractMapping from './middleware/extractMapping'
import mapAssets from './utils/mapAssets'
import {StaticRouter} from 'react-router'

import {Provider} from 'react-redux'
import store from '../client/pages/integration/store/forServer'
import {Content} from '../client/pages/integration/container/Root'
import Integration from '../client/pages/integration/App'

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
  const content = renderToString(<Provider store={store}>
    <StaticRouter
      location={req.url}
      context={{}}
      basename="/integration"
    >
      <Content component={Integration}/>
    </StaticRouter>
  </Provider>)
  res.render('integration', {
    app: content,
    links: mapAssets('integration/index.css'),
    scripts: mapAssets('integration/index.js')
  })
})
export default app
