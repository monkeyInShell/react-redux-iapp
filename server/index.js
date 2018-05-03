/**
 * Created by ink on 2018/3/29.
 */
import express from 'express'
import path from 'path'
import pages from './routes/pages'
const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.get(express.static(path.resolve(__dirname, '../public')))

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
//页面链式路由入口
app.use('/p', pages)
//首页
app.get('/', (req, res) => {
  res.render('homepage', {
    title: 'react-redux-iapp同构项目'
  })
})
app.use((req, res, next, err) => {
  res.json({
    message: '404',
    err: err
  })
})
export default app
