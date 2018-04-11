/**
 * Created by zhouyunkui on 2017/6/16.
 */
import React from 'react'
import './index.less'
import Hoc from '../hoc/Hoc'
import Staff from '../../../Components/Staff'
class Index extends Hoc {
  constructor (options) {
    super(options)
    this.state = {
      value: 0,
      update: false,
      width: 0,
      height: 50
    }
  }
  handleChange = () => {
    let value = this.input.value,
      regex = /^[0-9]{0,10}(\.[0-9]?[0-9]?)?$/
    if (regex.test(this.input.value)) {
      this.setState({
        value: value,
        update: true
      })
    }
  };
  outputCall = (value) => {
    this.setState({
      value: value,
      update: false
    })
  }
  getWidth = (instance) => {
    if (!this.instanceWidth) {
      this.instanceWidth = instance.offsetWidth
    }
    this.setState({
      width: this.instanceWidth,
      update: true
    })
  }
  blur = () => {
    this.input.blur()
  }
  focus = () => {
    this.input.focus()
  }
  componentDidMount () {
    this.input = this.refs.input
    super.componentDidMount()
  }
  render () {
    const {value, update, height, width} = this.state
    return <div>
      <div className="code-source">
        <a href="https://github.com/ZhouYK/iron/blob/master/assets/js/components/Staff/index.js" target="blank">示例代码</a>
      </div>
      <div className="input-upon-cursor">
        <input placeholder="点击输入" ref="input" value={ this.state.value } onChange={ this.handleChange } type="text" id="answer_value" />
        <span className="unit-span">万</span>
      </div>
      <div ref={ this.getWidth } >
        <Staff
          noCustomized = { true }
          outputCall = { this.outputCall }
          value = { value }
          update = { update }
          width = { width }
          height = { height }
          unit = { '万' }
          intervalList = { [ {
            interval: '0.1',
            max: '1.5',
            min: '0',
            unit: '万',
          }, {
            interval: '0.5',
            max: '9.0',
            min: '1.5',
            unit: '万',
          }, {
            interval: '1.0',
            max: '24.0',
            min: '9.0',
            unit: '万',
          }, {
            interval: '5.0',
            max: '99.0',
            min: '24',
            unit: '万',
          }, {
            interval: '0.0',
            max: '-1',
            min: '99.0',
            unit: '万',
          } ] }
          triggerBlur = { this.blur }
          triggerFocus = { this.focus }
        />
      </div>
    </div>
  }
}
export default Index
