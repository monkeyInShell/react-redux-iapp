/**
 * Created by ink on 2018/4/10.
 */
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { middleware } from './common';
import configureStore from '../configure/store';


const store = (reducers, history) => {
  const middlewares = middleware.concat(routerMiddleware(history));
  return configureStore(
    combineReducers(reducers),
    {},
    applyMiddleware(...middlewares),
  );
};
export const historyConf = options => createBrowserHistory(options);
export default store;
