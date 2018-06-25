/**
 * Created by ink on 2018/3/29.
 */
import express from 'express'
import path from 'path'
import pages from './routes/pages'
const config = require('config')
const app = express()
console.log(config.injectDevelopmentTools && config.injectDevelopmentTools(app))
const options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: 3600 * 24 * 7 * 1000,
  redirect: false
}
app.use(express.static(path.resolve(__dirname, '../public'), options))

//页面链式路由入口
app.use('/p', pages)
//首页
app.get('/', (req, res) => {
  res.render('homepage', {
    title: 'react-redux-iapp同构项目'
  })
})
app.use((err, req, res, next) => {
  res.json({
    message: '404',
    err: err
  })
})
export default app
