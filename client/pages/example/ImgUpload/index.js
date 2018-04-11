/**
 * Created by zhouyunkui on 2017/6/26.
 */
import React from 'react';
import Hoc from '../hoc/Hoc';
import ImgUpload from '../../../Components/ImgUpload';
import './index.less';
class Index extends Hoc {
  constructor (options) {
    super(options);
    this.state = {}
  }
  onChange = (file) => {
    // TODO
  }
  onDraw = (canvas) => {
    // TODO
  }
  render () {
    const style = {
      width: 250,
      height: 250,
    }
    return <div>
      <div className="code-source">
        <a href="https://github.com/ZhouYK/iron/blob/master/assets/js/components/ImgUpload/index.js" target="blank">示例代码</a>
      </div>
      <ImgUpload
        onChange={ this.onChange }
        onDraw={ this.onDraw }
        width={400}
        height={400}
        style={style}
      />
    </div>;
  }
}
export default Index
