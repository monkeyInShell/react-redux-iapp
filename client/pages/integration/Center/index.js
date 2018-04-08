/**
 * Created by ink on 2018/4/8.
 */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../redux/action'
import React, {Component} from 'react'

class Center extends Component {
  render () {
    console.log(this.props)
    return (<div>欢迎来到个人中心</div>)
  }
}
const mapStateToProps = state => {
  return {
    title: state.center.title,
    router: state.router
  }
}
/**
 * 如果不显示的设置返回dispatch，那么原先在组件内可通过this.props访问的dispatch将消失
 * @param dispatch
 * @returns {{actions: (A|B|M|N)}}
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
    //dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Center)
