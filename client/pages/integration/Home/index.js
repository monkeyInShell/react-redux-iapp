/**
 * Created by ink on 2018/4/8.
 */
import React, {Component} from 'react'
import connect from '../../tools/connect'
import * as actions from '../redux/action'
class Home extends Component {
  constructor(options) {
    super(options)
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.actions.home('我是首页')
      //通过action出发路由跳转
      //this.props.actions.jump('center')
    }, 2000)
  }
  render() {
    return (<div>
      {this.props.title}
    </div>)
  }
}
export default connect({
  title: state => state.home.title,
  router: state => state.router
}, {
  actions
})(Home)
