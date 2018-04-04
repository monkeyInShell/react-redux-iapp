const NODE_ENV = process.env.NODE_ENV
let config
if (NODE_ENV === 'local') {
  config = require('./webpack.config.local')
} else if (NODE_ENV === 'production') {
  config = require('./webpack.config.pro')
} else {
  config = require('./webpack.config.local')
}
module.exports = config
