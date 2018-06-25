/**
 * Created by ink on 2018/3/29.
 */
import express from 'express'
import path from 'path'
import pages from './routes/pages'
const config = require('config')
const app = express()
console.log(config.injectDevelopmentTools && config.injectDevelopmentTools(app))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.use(express.static(path.resolve(__dirname, '../public')))

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
