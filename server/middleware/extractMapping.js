/**
 * 在global上挂在静态资源列表
 * global.staticAssetsMapping
 */
import path from 'path'
const {NODE_ENV} = process.env
const mappingRealativePath = '../../public/mapping/mapping.json'
const mappingRealPath = path.resolve(__dirname, mappingRealativePath)
let mapping = {}
const extractMapping = (req, res, next) => {
  if (NODE_ENV === 'local') {
    mapping = res.locals.webpackStats.compilation.assets['mapping.json'].source()
  } else {
    // 每次请求清除模块缓存
    delete require.cache[mappingRealPath]
    try {
      mapping = require('../../public/mapping/mapping.json')
    } catch (err) {
      console.log(`mapping.json文件加载报错，${err}`)
      mapping = global.staticAssetsMapping || {}
    }
  }
  global.staticAssetsMapping = mapping
  next()
}

export default extractMapping