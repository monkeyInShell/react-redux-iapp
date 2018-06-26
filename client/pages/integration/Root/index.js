/**
 * Created by ink on 2018/4/8.
 */
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Local from './Local';
import Prod from './Prod';

let RealContent;
if (process.env.NODE_ENV === 'development') {
  RealContent = Local;
} else {
  RealContent = Prod;
}
console.log(process.env.NODE_ENV);
const Root = (props) => {
  const { store, history, component } = props;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RealContent component={component} />
      </ConnectedRouter>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};

export const Content = RealContent;
export default Root;
