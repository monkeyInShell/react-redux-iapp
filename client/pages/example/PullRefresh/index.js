/**
 * Created by zhouyunkui on 2017/6/22.
 */
import React from 'react';
import Hoc from '../hoc/Hoc';
import PullRefresh from '../../../components/PullRefresh';
import './index.less';
class Index extends Hoc {
  constructor (options) {
    super(options);
    this.state = {

    }
  }
  componentDidMount () {
    super.componentDidMount();
  }
  sendRequest = (callback) => {
    setTimeout(() => {
      callback({
        loading: false,
        text: '亲爱的主人，数据已经刷新啦！'
      })
    }, 1000)
  }
  render () {
    return <div className="pull-refresh-wrap">
      <div className="code-source">
        <a href="https://github.com/ZhouYK/iron/blob/master/assets/js/components/PullRefresh/index.js" target="blank">示例代码</a>
      </div>
      <div className="pull-refresh-fake">
        <PullRefresh
          request={this.sendRequest}
        >
          <ul>
            <li>横看成林侧成峰，</li>
            <li>远近高低各不同。</li>
            <li>不识庐山真面目，</li>
            <li>只缘生在此山中。</li>
          </ul>
        </PullRefresh>
      </div>
    </div>
  }
}
export default Index;
