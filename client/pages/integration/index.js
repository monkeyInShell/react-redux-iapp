/**
 * Created by ink on 2018/4/8.
 */
import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter, Router} from 'react-router-dom'
import App from './App'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {routerReducer, routerMiddleware, push} from 'react-router-redux'
import {center, home} from './redux/reducer'
const history = createBrowserHistory({
  basename: '/integration'
})
const middleware = routerMiddleware(history)

const store = createStore(combineReducers({
  center,
  home,
  router: routerReducer
}), applyMiddleware(middleware)
)
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))
ReactDom.render(
  <Provider store={store}>
    <Router history={ history }>
      <App/>
    </Router>
  </Provider>
  ,
  document.getElementById('bd')
)
