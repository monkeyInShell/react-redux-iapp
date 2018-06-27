import devConfig from './webpack.config.dev.babel';
import prodConfig from './webpack.config.prod.babel';

const { NODE_ENV } = process.env;

let config;
if (NODE_ENV === 'development') {
  console.log('读取webpack.config.dev.babel.js');
  config = devConfig;
} else {
  console.log('读取webpack.config.prod.babel.js');
  config = prodConfig;
}
module.exports = config;
