/**
 * Created by ink on 2018/4/10.
 */
import { routerReducer } from 'react-router-redux';
import { center, home } from '../redux/reducer';

const reducers = {
  center,
  home,
  router: routerReducer,
};
export default reducers;
