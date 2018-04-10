/**
 * Created by ink on 2018/4/10.
 */
import {center, home} from '../../integration/redux/reducer'
import {routerReducer} from 'react-router-redux'

const reducers = {
  center,
  home,
  router: routerReducer
}
export default reducers
