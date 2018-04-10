/**
 * Created by ink on 2018/4/10.
 */
import {middleware} from './common'
import {applyMiddleware, combineReducers} from 'redux'
import configureStore from '../configure/store'
const store = reducers => {
  return configureStore(
    combineReducers(reducers),
    {},
    applyMiddleware(...middleware)
  )
}
export default store
