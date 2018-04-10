/**
 * Created by ink on 2018/4/10.
 */
import {middleware} from './common'
import {routerMiddleware} from 'react-router-redux'
import {applyMiddleware, combineReducers} from 'redux'
import {createBrowserHistory} from 'history'
import configureStore from '../configure/store'
const history = createBrowserHistory({
  basename: '/integration'
})

const middlewares = middleware.concat(routerMiddleware(history))

const store = reducers => {
  return configureStore(
    combineReducers(reducers),
    {},
    applyMiddleware(...middlewares)
  )
}
export {history}
export default store
