/**
 * Created by ink on 2018/4/8.
 */
import React from 'react';
import ReactDom from 'react-dom';
import Root from './Root';
import App from './App';
import storeFactory, { historyConf } from '../tools/store/forBrowser';
import reducers from './store';

const history = historyConf({
  basename: '/p/integration',
});
const store = storeFactory(reducers, history);

ReactDom.hydrate(
  <Root store={store} history={history} component={App} />,
  document.getElementById('bd'),
);
