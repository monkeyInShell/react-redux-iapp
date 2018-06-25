'use strict';

import React from 'react'
import {renderToString} from 'react-dom/server'
import mapAssets from '../utils/mapAssets'
import Component from '../../client/pages/example/App'
import {StaticRouter} from 'react-router'
import express from 'express'
const router = express.Router()
router.get('*', (req, res, next) => {
  //可以根据路径，针对某一个页面进行服务端渲染
  const location = `${req.baseUrl}${req.path}`
  console.log(req.path)
  const content = renderToString(<StaticRouter
    location={location}
    context={{}}
    basename={req.baseUrl}>
    <Component/>
  </StaticRouter>)
  res.render('components', {
    app: content,
    links: mapAssets('components/index.css'),
    scripts: mapAssets('components/index.js')
  })
})

export default {
  router
}
