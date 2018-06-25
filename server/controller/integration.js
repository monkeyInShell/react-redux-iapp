'use strict';

import express from 'express'
import React from 'react'
import {toSream, setResHeaders} from '../react'
import Skeleton from '../react/skeleton'
import mapReactAssets from '../utils/mapReactAssets'
import {StaticRouter} from 'react-router'
import {Provider} from 'react-redux'
import store from '../../client/pages/tools/store/forServer'
import {Content} from '../../client/pages/integration/Root/index'
import reducers from '../../client/pages/integration/store/'
import Integration from '../../client/pages/integration/App'

const router = express.Router()
router.get('*', (req, res, next) => {
  const location = `${req.baseUrl}${req.path}`
  const Html = (props) => (
    <Skeleton
      title="整合redux"
      links={mapReactAssets('integration/index.css')}
      scripts={mapReactAssets('integration/index.js')}
    >
      <Provider store={store(reducers)}>
        <StaticRouter
          location={location}
          context={{}}
          basename={req.baseUrl}
        >
          <Content component={Integration}/>
        </StaticRouter>
      </Provider>
    </Skeleton>
  )
  toSream(<Html />).pipe(setResHeaders(res))
})

export default {
  router
}
