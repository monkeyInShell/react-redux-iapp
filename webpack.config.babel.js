const NODE_ENV = process.env.NODE_ENV
let config
if (NODE_ENV === 'local') {
  config = require('./webpack.config.dev.babel')
} else {
  config = require('./webpack.config.prod.babel')
}
module.exports = config
