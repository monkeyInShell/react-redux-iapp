const NODE_ENV = process.env.NODE_ENV
let config
if (NODE_ENV === 'local') {
  config = require('./webpack.config.local')
} else {
  config = require('./webpack.config.pro')
}
module.exports = config
