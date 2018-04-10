/**
 * Created by ink on 2018/4/8.
 */
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import React from 'react'
let ContentEnv
if (process.env.NODE_ENV === 'local') {
  ContentEnv = require('./Local')
} else {
  ContentEnv = require('./Prod')
}
const RealContent = ContentEnv.default
const Root = (props) => {
  const {store, history, component} = props
  return (<Provider store={store}>
    <ConnectedRouter history={history}>
      <RealContent component={component}/>
    </ConnectedRouter>
  </Provider>)
}
export {RealContent as Content}
export default Root
