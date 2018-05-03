/**
 * Created by ink on 2018/5/3.
 */

import React from 'react'
import {renderToString} from 'react-dom/server'
import Component from '../../client/pages/example/App'
import extractMapping from '../middleware/extractMapping'
import mapAssets from '../utils/mapAssets'
import {StaticRouter} from 'react-router'

import {Provider} from 'react-redux'
import store from '../../client/pages/tools/store/forServer'
import {Content} from '../../client/pages/integration/Root/index'
import Integration from '../../client/pages/integration/App'
import reducers from '../../client/pages/integration/store/'
import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.status(301).set('Location', '/').end()
})

router.get('/integration(/:page)?', extractMapping, (req, res, next) => {
  const content = renderToString(<Provider store={store(reducers)}>
    <StaticRouter
      location={req.originalUrl}
      context={{}}
      basename="/p/integration"
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

router.get('/components(/:page)?', extractMapping, (req, res, next) => {
  //可以根据路径，针对某一个页面进行服务端渲染
  const content = renderToString(<StaticRouter
    location={req.originalUrl}
    context={{}}
    basename="/p/components">
    <Component/>
  </StaticRouter>)
  res.render('components', {
    app: content,
    links: mapAssets('components/index.css'),
    scripts: mapAssets('components/index.js')
  })
})
export default router
