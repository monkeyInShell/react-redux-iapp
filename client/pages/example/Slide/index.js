/**
 * Created by zhouyunkui on 2017/6/9.
 */
import React from 'react';
import {Slide, SlideItem, } from '../../../components/Slide';
import Hoc from '../hoc/Hoc';
import './index.less';
class Index extends Hoc {
  constructor (options) {
    super(options)
    this.state = {
      num: 0
    }
  }
  // 会覆盖父组件同名方法
  componentDidMount () {
    super.componentDidMount()
  }
  render () {
    const style = {
      width: 300,
      height: 300,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
    return <div className="demo-slide">
      <div className="code-source">
        <a href="https://github.com/ZhouYK/iron/blob/master/assets/js/components/Slide/index.js" target="blank">示例代码</a>
      </div>
      <div>
        <p>这是一个水平滚动slide实例</p>
        <div style={style}>
          <Slide layout={'horizontal'} defaultActiveIndex={0} className={''} style={{}} slideFeedback={false} preSlide={function ({activeIndex}) {
            console.log('滑动开始:当前的slide序号', activeIndex)
          }} afterSlide={function ({activeIndex}) {
            console.log('滑动结束:当前的slide序号', activeIndex);
          }}>
            <SlideItem className={ 'slide-0' }>
              <div className="slide-0-content">测试文字内容</div>
            </SlideItem>
            <SlideItem className={ 'slide-2'}>
              <div className="slide-2-content" >测试文字内容</div>
            </SlideItem>
            <SlideItem style={{backgroundColor: 'black'}} className={'slide-3'}>
              <div className="slide-3-content">测试文字</div>
            </SlideItem>
          </Slide>
        </div>
      </div>
      <div>
        <p>这是一个垂直滚动slide实例</p>
        <div style={style}>
          <Slide layout="vertical" defaultActiveIndex={1} className="" style={{}} slideFeedback={true} preSlide={function ({activeIndex}) {
            console.log('滑动开始:当前的slide序号', activeIndex)
          }} afterSlide={function ({activeIndex}) {
            console.log('滑动结束:当前的slide序号', activeIndex);
          }}>
            <SlideItem className="slide-0">
              <div className="slide-0-content">测试文字内容</div>
            </SlideItem>
            <SlideItem className="slide-2">
              <div className="slide-2-content" >测试文字内容</div>
            </SlideItem>
            <SlideItem style={{backgroundColor: 'black'}} className="slide-3">
              <div className="slide-3-content">测试文字内容</div>
            </SlideItem>
          </Slide>
        </div>
      </div>
    </div>
  }
}
export default Index;
