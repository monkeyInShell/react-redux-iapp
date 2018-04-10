/**
 * Created by ink on 2018/4/9.
 */
let configureStore
if (process.env.NODE_ENV === 'local') {
  configureStore = require('./store.local')
} else {
  configureStore = require('./store.prod')
}
module.exports = configureStore
