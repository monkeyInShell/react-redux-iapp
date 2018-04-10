/**
 * Created by ink on 2018/4/8.
 */
import * as actions from '../redux/action'
import React, {Component} from 'react'
import connect from '../../tools/connect'

class Center extends Component {
  render () {
    return (<div>欢迎来到个人中心</div>)
  }
}
export default connect({
  title: state => state.center.title,
  router: state => state.router
}, {
  actions
})(Center)
