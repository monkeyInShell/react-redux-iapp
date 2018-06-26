/**
 * 在global上挂在静态资源列表
 * global.staticAssetsMapping
 */
import path from 'path';

const config = require('config');

const mappingRealativePath = '../../public/mapping/mapping.json';
const mappingRealPath = path.resolve(__dirname, mappingRealativePath);
let mapping = {};
const extractMapping = (req, res, next) => {
  if (config.env === 'development') {
    mapping = res.locals.webpackStats.compilation.assets['mapping.json'].source();
  } else {
    // 每次请求清除模块缓存
    delete require.cache[mappingRealPath];
    try {
      /* eslint-disable global-require */
      /* eslint-disable import/no-unresolved */
      mapping = require('../../public/mapping/mapping.json');
    } catch (err) {
      console.log(`mapping.json文件加载报错，${err}`);
      mapping = global.staticAssetsMapping || {};
    }
  }
  global.staticAssetsMapping = mapping;
  next();
};

export default extractMapping;
