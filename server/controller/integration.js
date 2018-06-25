'use strict'

import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import mapAssets from '../utils/mapAssets'
import {StaticRouter} from 'react-router'
import {Provider} from 'react-redux'
import store from '../../client/pages/tools/store/forServer'
import {Content} from '../../client/pages/integration/Root/index'
import reducers from '../../client/pages/integration/store/'
import Integration from '../../client/pages/integration/App'

const router = express.Router()
router.get('*', (req, res, next) => {
  const location = `${req.baseUrl}${req.path}`
  const content = renderToString(<Provider store={store(reducers)}>
    <StaticRouter
      location={location}
      context={{}}
      basename={req.baseUrl}
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

export default {
  router
}
