/**
 * Created by ink on 2018/4/9.
 */

import React, {Fragment} from 'react'
import DevTools from '../../tools/DevTools/index'
const Content = (props) => {
  const {component: CustomerContent} = props
  return (<Fragment>
    <CustomerContent/>
    <DevTools/>
  </Fragment>)
}
export default Content
