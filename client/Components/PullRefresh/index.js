/**
 * Created by zhouyunkui on 2017/6/22.
 */
/* eslint-disable */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import './PullRefresh.less';
import { preventDocMove, offPreventDefault, } from '../../pages/example/common/js/preventDocMove';
const PULLTEXT = '下拉刷新',
  RELEASETEXT = '释放',
  LOADING = '正在加载';
class PullRefresh extends Component {
  static propTypes = {
    request: PropTypes.func,//发起请求
    loadingHeight: PropTypes.number,//加载显示区域的高度
  }
  static defaultProps = {
    request: ( callback ) => {
      //callback用于改变PullRefresh状态
    },
    loadingHeight: 50,
  }
  constructor( options ) {
    super( options );
    this.inOneAction = false,//判断是否是在一次下拉动作的流程中，如果是则阻止后续的拉动，等待此次拉动完毕
    this.doNothing = false;//一套动作对应一个过程，不允许多套动作对应一个过程
    this.state = {
        text: PULLTEXT,
        loading: false,
        transform: 0,
        transformLimit: 50,//滑动距离的上限
        transition: '',
        switchLimit: 50 * ( 2 / 3 ),//transformLimit为参考s
      }
  }
  start = ( evt ) => {
    if ( this.inOneAction ) {
      this.doNothing = true;
      return;
    } else {
      this.doNothing = false;
    }
    this.startX = evt.changedTouches[0].clientX;
    this.startY = evt.changedTouches[0].clientY;
    this.switchRate = undefined;
    this.cacheTransform = this.state.transform;
    this.preventDocMove = false;
    this.scrollTop = window.scrollY;
  }
  move = ( evt ) => {
    if ( this.doNothing ) return;
    const { transformLimit, text: _text, switchLimit, } = this.state;
    this.moveX = evt.changedTouches[0].clientX;
    this.moveY = evt.changedTouches[0].clientY;
    let currentMove = this.moveY - this.startY;
    if ( currentMove !== 0 && this.switchRate === undefined ) {
      const direction = currentMove > 0 ? 1 : ( currentMove < 0 ? -1 : 0 );
      if ( direction === 0 || direction === -1 || this.inOneAction ) {
        return
      }
      const otherAxis = this.moveX - this.startX;
      this.switchRate = Math.abs( otherAxis / currentMove );
      //第一次move，有效滑动
      if ( this.switchRate <= 0.7 && this.scrollTop <= 0 ) {
        this.inOneAction = true;
      }
    }
    //需要对页面的scrollTop进行判断
    if ( this.switchRate <= 0.7 && this.scrollTop <= 0 ) {
      this.preventDocMove = true;
      //需要判断边界transformLimit
      let transformDistance = this.cacheTransform + currentMove,
        text = _text;
      //滑动到上限的一半时变化
      if ( transformDistance >= switchLimit && transformDistance < transformLimit) {
        text = RELEASETEXT
      } else if ( transformDistance >= transformLimit ) {
        transformDistance = transformLimit;
      } else if ( transformDistance < switchLimit && transformDistance >= 0 ){
        text = PULLTEXT;
      } else {
        transformDistance = 0;
      }
      this.setState( {
        transform: transformDistance,
        transition: '',
        text
      } )
    }
  }
  end = ( evt ) => {
    this.preventDocMove = false;
    if ( this.doNothing ) return;
    const { transformLimit, transform, text: _text, switchLimit, } = this.state;
    if ( transform === 0 ) {
      this.inOneAction = false;
    }
      const { request, } = this.props;
    let finalMove = transform,
      loading = false,
      text = _text;
    if ( transform < switchLimit ) {
      finalMove = 0;
    } else {
      finalMove = transformLimit;
      loading = true;
      text = LOADING;
    }
    this.setState( {
      transform: finalMove,
      loading,
      text,
      transition: 'transition',
    }, () => {
        if ( loading ) {
          request( this.getRequestResult );
        }
    } )
  }
  getRequestResult = ( { loading, text, } ) => {
    this.setState( {
      loading,
      text
    }, () => {
      setTimeout( () => {
        this.setState( {
          transition: 'transition',
          transform: 0,
        } )
      }, 1500)
    } )
  }
  handleTransitionEnd = ( evt ) => {
    const { transform } = this.state;
    if ( transform === 0 ) {
      this.inOneAction = false;
    }
  }
  componentDidMount() {
    preventDocMove.call( this );
  }
  componentWillUnmount() {
    offPreventDefault.call( this );
  }
  render() {
    const { children, loadingHeight, } = this.props;
    const { text, transition, transform, } = this.state;
    const style = Object.assign( {}, {
      transform: `translateY(${transform}px)`,
      WebkitTransform: `translateY(${transform}px)`,
      transition: `${ transition ? 'transform .6s cubic-bezier(.53,.54,.02,.99)' : '' }`,
      WebkitTransition: `${ transition ? '-webkit-transform .6s cubic-bezier(.53,.54,.02,.99)' : '' }`,
    } )
    const iconStyle = {
      height: loadingHeight,
      lineHeight: `${loadingHeight}px`,
    }
    return <section
      className="pull-refresh"
      onTouchStart={ this.start }
      onTouchMove={ this.move }
      onTouchEnd={ this.end }
      onTouchCancel={ this.end }
    >
      <section className="pull-refresh-loading-icon" style={ iconStyle }>
        { text }
      </section>
       <section
         style={ style }
         className="pull-refresh-inner"
         onTransitionEnd={ this.handleTransitionEnd }
       >
         <section
           className="pull-refresh-content"
         >
           { children }
         </section>
       </section>
    </section>
  }
}
export default PullRefresh;