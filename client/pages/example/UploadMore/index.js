/**
 * Created by zhouyunkui on 2017/6/21.
 */
import React from 'react'
import Hoc from '../hoc/Hoc'
import './index.less'
import UploadMore from '../../../Components/UploadMore'
class Index extends Hoc {
  constructor (options) {
    super(options)
    this.state = {
      reference: null
    }
  }
  /**
   * 请求函数，需要在请求结束向加载更多组件传递状态（通过回调）
   * @param callback
   */
  request = (callback) => {
    setTimeout(function () {
      callback({
        text: '加载更多',
        loading: false
      })
    }, 2000)
  }
  componentDidMount () {
    super.componentDidMount()
    this.setState({
      reference: this.refs.reference
    })
  }
  render () {
    const { reference } = this.state
    return <div>
      <div className="code-source">
        <a href="https://github.com/ZhouYK/iron/blob/master/assets/js/components/UploadMore/index.js" target="blank">示例代码</a>
      </div>
      <div ref = 'reference' className="upload-more-test">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
        { reference ? <UploadMore
          reference = { reference }
          request = { this.request }
          className = 'test'
          style = {{width: '100%', height: 30}}
        /> : null }
      </div>
    </div>
  }
}
export default Index
