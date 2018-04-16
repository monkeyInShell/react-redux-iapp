/**
 * Created by ink on 2018/4/10.
 */
import {middleware} from './common'
import {routerMiddleware} from 'react-router-redux'
import {applyMiddleware, combineReducers} from 'redux'
import {createBrowserHistory} from 'history'
import configureStore from '../configure/store'
const historyConf = (options) => {
  return createBrowserHistory(options)
}

const store = (reducers, history) => {
  const middlewares = middleware.concat(routerMiddleware(history))
  return configureStore(
    combineReducers(reducers),
    {},
    applyMiddleware(...middlewares)
  )
}
export {historyConf}
export default store
