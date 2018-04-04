/**
 * Created by zhouyunkui on 2017/6/14.
 */
import React from 'react';
import './index.less';
import ItemMove from '../../../components/ItemMove';
import Hoc from '../hoc/Hoc';
class Index extends Hoc {
  constructor (options) {
    super(options);
    this.state = {
      closed: false
    }
  }
  handleClosed = (closed) => {
    // 组件外部控制widgetButton隐藏或显示
    this.setState({
      closed
    })
  }
  handleButtonClick = () => {
  }
  render () {
    const { closed } = this.state;
    return <div>
      <div className="code-source">
        <a href="https://github.com/ZhouYK/iron/blob/master/assets/js/components/ItemMove/index.js" target="blank">示例代码</a>
      </div>
      <ul className="item-move-list">
        <li>
          <ItemMove
            closed={ closed }
            handleClosed={ this.handleClosed}
            buttons={ [
              {
                type: 'alert',
                text: '删除',
                onClick: this.handleButtonClick,
                width: 100
              }
            ] }
          >
            <div style={ { paddingLeft: 16 } }>
              鹅，鹅，鹅
            </div>
          </ItemMove>
        </li>
        <li>
          <ItemMove
            closed={ closed }
            handleClosed={ this.handleClosed}
            buttons={ [
              {
                type: 'warning',
                text: '忽略',
                onClick: this.handleButtonClick,
                width: 100
              }
            ] }
          >
            <div style={ { paddingLeft: 16 } }>
              曲项向天歌
            </div>
          </ItemMove>
        </li>
        <li>
          <ItemMove
            closed={ closed }
            handleClosed={ this.handleClosed}
            buttons={ [
              {
                type: 'normal',
                text: '查看',
                onClick: this.handleButtonClick,
                width: 100
              }
            ] }
          >
            <div style={ { paddingLeft: 16 } }>
              白毛浮绿水
            </div>
          </ItemMove>
        </li>
        <li>
          <ItemMove
            closed={ closed }
            handleClosed={ this.handleClosed}
            buttons={ [
              {
                type: 'default',
                text: '取消',
                onClick: this.handleButtonClick,
                width: 100
              }
            ] }
          >
            <div style={ { paddingLeft: 16 } }>
              红掌拨清波
            </div>
          </ItemMove>
        </li>
      </ul>
    </div>
  }
}
export default Index
