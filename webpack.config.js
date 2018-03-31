const devConfig = require("./webpack.config.dev")
const proConfig = require("./webpack.config.pro")
const NODE_ENV = process.env.NODE_ENV
let config
if (NODE_ENV === 'development') {
  config = devConfig
} else if (NODE_ENV === 'production') {
  config = proConfig
} else {
  config = devConfig
}
module.exports = config