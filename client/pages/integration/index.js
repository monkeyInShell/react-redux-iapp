/**
 * Created by ink on 2018/4/8.
 */
import React from 'react'
import ReactDom from 'react-dom'
import Root from './Root/index'
import App from './App'
import storeFactory, {history} from '../tools/store/forBrowser'
import reducers from './store/'
const store = storeFactory(reducers)
ReactDom.hydrate(
  <Root store={store} history={history} component={App} />,
  document.getElementById('bd')
)
