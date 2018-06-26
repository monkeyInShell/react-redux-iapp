/**
 * Created by ink on 2018/4/9.
 */
import { createStore, compose } from 'redux';
import DevTools from '../DevTools/index';

export default function configureStore(reducers, initialState = {}, enhancer) {
  const innerEnhancer = compose(
    enhancer,
    DevTools.instrument(),
  );
  const store = createStore(reducers, initialState, innerEnhancer);
  return store;
}
