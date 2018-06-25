/**
 * Created by ink on 2018/4/11.
 */
import React from 'react'
import Loadable from 'react-loadable'
const loadingComponent = Loading => props => {
  // props.error:When the loader has errored
  // props.timedOut: When the loader has taken longer than the timeout
  // props.pastDelay: When the loader has taken longer than the delay
  // else: When the loader has just started
  return <Loading {...props}/>
};
export default (prefix, Loading) => path => {
  return Loadable({
    loader: () => import(`../../${prefix}${path}`),
    loading: loadingComponent(Loading),
    timeout: 10000
  })
};
