/**
 * Created by ink on 2018/4/10.
 */
import {routerReducer} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import {center, home} from '../redux/reducer'

const reducers = {
  center,
  home,
  router: routerReducer
}
const middleware = [thunkMiddleware]

export {reducers, middleware}
export default {reducers, middleware}
