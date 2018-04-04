/**
 * Created by zhouyunkui on 2017/6/14.
 */
/* eslint-disable */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import './ItemMove.less';
import { preventDocMove, offPreventDefault, } from '../../pages/example/common/js/preventDocMove';
class ItemMove extends Component {
  static propTypes = {
    children: PropTypes.oneOfType( [
      PropTypes.arrayOf( PropTypes.node ),
      PropTypes.node
    ] ),
    className: PropTypes.string,
    style: PropTypes.object,
    buttons: PropTypes.arrayOf( PropTypes.object ),
    closed: PropTypes.bool,
    handleClosed: PropTypes.func
  }
  static defaultProps = {
    style: {},
    className: '',
    transformLimit: 30,
    buttons: [ {
      type: 'alert',
      text: '删除',
      width: 100,
      onClick: () => {
        //按钮事件
      }
    } ],
    closed: false,
    handleClosed: function( closed ){
      //设置外部组件的传入的closed值
    }
  }
  constructor(options){
    super(options);
    //按钮宽度
    this.state = {
      transform: 0,
      active: false,
    }
  }
  componentWillReceiveProps( nextProps ){
    const { handleClosed } = this.props;
    if ( nextProps.closed ) {
      this.setState( {
        transform: 0,
        active: false,
      }, () => {
        //反馈给外部
        handleClosed(false);
      } )
    }
  }
  calculateButtonsWidth = () => {
    const { buttons } = this.props;
    let width = 0;
    buttons.map( ( item, index ) => {
      width += item.width;
    } )
    return -width
  }
  preventWhenSlideToRight = ( direction ) => {
    const { transform } = this.state;
    const startPoint = 0 ,
      endPoint = this.calculateButtonsWidth();
    if ( direction === 1 ) {
     if ( transform === startPoint ) {
       return false;
     }
    } else if( direction === -1 ) {
      if ( transform === endPoint ) {
        return false
      }
    } else {
      return false
    }
    return true;
  }
  start = ( event ) => {
    //阻止在同一次操作中发生关闭和打开
    this.preventItemMove = false;
    this.preventDocMove = false;
    const { active } = this.state;
    //当前滑动的Item是活跃的，则阻止滑动
    if ( active ) {
      this.preventItemMove = true;
      this.setState ( {
        active: !active,
        transform: 0
      } )
      event.preventDefault();
    } else {
      //滑动前关闭所有活跃的
      const { handleClosed } = this.props;
      handleClosed( true );
    }
    this.startX = event.changedTouches[0].clientX;
    this.startY = event.changedTouches[0].clientY;
    this.switchRate = undefined;
    this.cacheTransform = this.state.transform;
  }
  move = ( event ) => {
    if ( this.preventItemMove ) {
      event.preventDefault();
      return ;
    }
    this.moveX = event.changedTouches[0].clientX;
    this.moveY = event.changedTouches[0].clientY;
    let currentMove = this.moveX - this.startX;
    if( currentMove !== 0 && this.switchRate === undefined ) {
      const direction = currentMove > 0 ? 1 : ( currentMove < 0 ? -1 : 0 );
      if (!this.preventWhenSlideToRight(direction)) {
        return;
      }
      const otherAxis = this.moveY - this.startY;
      this.switchRate = Math.abs(otherAxis) / Math.abs(currentMove);
    }
    if( this.switchRate <= 0.7 ) {
      this.preventDocMove = true;
      let transformDistance = this.cacheTransform + currentMove;
      let finalTransformDistance,
        startPoint = 0,
        endPoint = this.calculateButtonsWidth();
      if ( transformDistance >= startPoint ) {
        finalTransformDistance = startPoint;
      } else if ( transformDistance <= endPoint ) {
        finalTransformDistance = endPoint;
      } else {
        finalTransformDistance = transformDistance;
      }
      this.setState({
        transform: finalTransformDistance,
        transition: ''
      })
    }
  }
  end = ( event ) => {
    this.preventDocMove = false;
    const { transformLimit } = this.props;
    const { transform, active: _active } = this.state;
    this.endX = event.changedTouches[0].clientX;
    let distance, newTransform = transform, active = _active;
    distance = this.endX - this.startX;
    const direction = distance > 0 ? 1 : (distance < 0 ? -1 : 0);
    const startPoint = 0,
      endPoint = this.calculateButtonsWidth();
    if ( direction === -1 ) {
      if ( startPoint - transform >= transformLimit ) {
        newTransform = endPoint;
        active = true;
      } else {
        newTransform = startPoint;
        active = false;
      }
    } else if ( direction === 1 ) {
      if ( transform - endPoint >= transformLimit ) {
        newTransform = startPoint;
        active = false;
      }else {
        newTransform = endPoint;
        active = true;
      }
    }
    this.setState( {
      transform: newTransform,
      transition: 'transition',
      active,
    } )
  }
  getButtons = () => {
    const { buttons } = this.props;
    return buttons.map( ( button, index ) => {
      return <WidgetButton
        onClick={ button.onClick }
        width={ button.width }
        className={ `widget-button-${button.type}` }
        key={ `widget-button-${index}` }
      >
        { button.text }
      </WidgetButton>
    } )
  }
  componentDidMount() {
    preventDocMove.call( this );
  }
  componentWillUnmount() {
    offPreventDefault.call( this );
  }
  render() {
    const { className, style, children} = this.props;
    const { transform, transition } = this.state;
    const styleOfContent = {
      transform: `translateX(${transform}px)`,
      WebkitTransform: `translateX(${transform}px)`,
      transition: `${ transition ? 'transform .6s cubic-bezier(.53,.54,.02,.99)' : ''}`,
      WebkitTransition: `${ transition ? '-webkit-transform .6s cubic-bezier(.53,.54,.02,.99)' : ''}`
    }
    return <div className={`item-move ${className}`} style={style} >
      <div
        className="item-move-content"
        style={styleOfContent}
        onTouchStart={ this.start }
        onTouchMove={ this.move }
        onTouchEnd={ this.end }
        onTouchCancel={ this.end }
      >
        {children}
      </div>
      <div className="widget-button-wrap">
        { this.getButtons() }
      </div>
    </div>
  }
}
class WidgetButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.oneOfType( [
      PropTypes.arrayOf( PropTypes.node ),
      PropTypes.node
    ] ),
    onClick: PropTypes.func,
    width: PropTypes.number
  }
  static defaultProps = {
    className: '',
    style: {},
    width: 100,
    onClick: () => {

    }
  }
  render() {
    const { className, style, onClick, children, width, } = this.props;
    const buttonStyle = Object.assign( {}, {
      width: width,
    }, style )
    return <div className={`widget-button ${className}`} style={ buttonStyle } onClick={ onClick }>
      <span className="widget-button-content">{children}</span>
    </div>
  }
}
export default ItemMove;