/**
 * Created by ink on 2018/4/8.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from '../../tools/connect';
import * as action from '../redux/action';

class Home extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { actions } = this.props;
    setTimeout(() => {
      actions.home('个人主页内容展示');
      // 通过action出发路由跳转
      // this.props.actions.jump('center')
    }, 2000);
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        {title}
      </div>
    );
  }
}
export default connect({
  title: state => state.home.title,
  router: state => state.router,
}, {
  actions: action,
})(Home);
