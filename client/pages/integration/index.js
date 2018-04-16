/**
 * Created by ink on 2018/4/8.
 */
import React from 'react'
import ReactDom from 'react-dom'
import Root from './Root/index'
import App from './App'
import storeFactory, {historyConf} from '../tools/store/forBrowser'
import reducers from './store/'
const store = storeFactory(reducers)
const history = historyConf({
  basename: '/integration'
})
ReactDom.hydrate(
  <Root store={store} history={history} component={App} />,
  document.getElementById('bd')
)
