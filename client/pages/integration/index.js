/**
 * Created by ink on 2018/4/8.
 */
import React from 'react'
import ReactDom from 'react-dom'
import Root from './container/Root'
import App from './App'
import store, {history} from './store/forBrowser'
ReactDom.hydrate(
  <Root store={store} history={history} component={App} />,
  document.getElementById('bd')
)
