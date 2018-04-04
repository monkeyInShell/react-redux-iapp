/**
 * Created by zhouyunkui on 2017/6/21.
 */
import React from 'react';
import Hoc from '../hoc/Hoc';
import Dashboard from '../../../components/Dashboard';
import './index.less';
class Index extends Hoc {
  constructor (options) {
    super(options);
    this.state = {

    }
  }
  render () {
    return <div className="dashboard-wrap">
      <div className="code-source">
        <a href="https://github.com/ZhouYK/iron/blob/master/assets/js/components/Dashboard/index.js" target="blank">示例代码</a>
      </div>
      <Dashboard />
    </div>
  }
}
export default Index;
