/**
 * Created by ink on 2018/4/11.
 */
import React from 'react';
import Loadable from 'react-loadable';

const loadingComponent = Loading => props => <Loading {...props} />;
export default (prefix, Loading) => path => Loadable({
  loader: () => import(`../../${prefix}${path}`),
  loading: loadingComponent(Loading),
  timeout: 10000,
});
