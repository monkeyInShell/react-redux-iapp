/**
 * Created by ink on 2018/4/8.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../redux/action'
class Home extends Component {
  constructor(options) {
    super(options)
    console.log(this.props)
  }
  componentDidMount() {
    setTimeout(() => {
      //this.props.actions.home('我是首页')
      //通过action出发路由跳转
      this.props.actions.jump('center')
    }, 2000)
  }
  render() {
    return (<div>
      {this.props.title}
    </div>)
  }
}
const mapStateToProps = state => {
  return {
    title: state.home.title,
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)
