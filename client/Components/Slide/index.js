/**
 * Created by zhouyunkui on 2017/6/9.
 */
/* eslint-disable */
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import './Slide.less';
import { preventDocMove, offPreventDefault, } from '../../pages/example/common/js/preventDocMove';
const VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal';
export class Slide extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    preSlide: PropTypes.func,
    afterSlide: PropTypes.func,
    slideFeedback: PropTypes.bool,
    slideFeedbackTransformLimit: PropTypes.number,
    transformLimit: PropTypes.number,
    children: PropTypes.oneOfType( [
      PropTypes.arrayOf( PropTypes.node ),
      PropTypes.node
    ] ).isRequired,
    layout: PropTypes.oneOf([VERTICAL, HORIZONTAL])
  }
  static defaultProps = {
    defaultActiveIndex: 0,
    activeIndex: 0,
    className: '',
    slideFeedback: true,
    transformLimit: 50,
    slideFeedbackTransformLimit: 80,
    layout: HORIZONTAL
  }
  constructor(options){
    super(options);
    const { children, defaultActiveIndex, activeIndex, width, height, } = this.props;
    const count = React.Children.count( children );
    this.state = {
      transform: - ( defaultActiveIndex * width ),
      transition: 'transition',
      region: this.progressRegion( { width, count } ),
      activeIndex: activeIndex ,
      width: width,
      height: height,
    }
  }
  getSlidePane = () => {
    const { children } = this.props;
    const { width, height } = this.state;
    return React.Children.map( children , (child) => {
      if( !child ) return;
      const order = parseInt(child.props.order, 10);
      return React.cloneElement( child, {
        children: child.props.children,
        key: `slidepane-${order}`,
        width: width,
        height: height,
      })
    })
  }
  /**
   * prevent sliding when current slide is the first or the last
   * @param direction
   * @returns {boolean}
   */
  slideFeedbackSwitch = ( direction ) => {
    const { slideFeedback, children, } = this.props;
    const { activeIndex } = this.state;
    const count = React.Children.count( children );
    if ( !slideFeedback ) {
      if ( direction === -1 ) {
        if ( activeIndex === count-1 ) {
          return false
        }
      } else if ( direction === 1 ) {
        if ( activeIndex === 0 ) {
          return false
        }
      } else if ( direction === 0 ) {
        return false
      }
    }
    return true;
  }
  whenSlideReachFeedbackTransformLimit = ( transformDistance ) => {
    const { region } = this.state;
    const { slideFeedbackTransformLimit, slideFeedback, } = this.props;
    const first = region[0];
    const last = region[region.length-1];
    const howFarFromBeginToCurrent = transformDistance - first,
      howFarFromEndToCurrent = last - transformDistance;
    let finalTransformDistance = transformDistance;
    //此处判断可以去掉，可实现回拉过边界后恢复原状的效果（类似微信）
    if( !slideFeedback ) {
      if( howFarFromBeginToCurrent >= 0 ) {
        finalTransformDistance = first;
      } else if ( howFarFromEndToCurrent >= 0 ) {
        finalTransformDistance = last;
      }
      return finalTransformDistance;
    }
    if ( howFarFromBeginToCurrent >= slideFeedbackTransformLimit ) {
      finalTransformDistance = slideFeedbackTransformLimit;
    } else if( howFarFromEndToCurrent >= slideFeedbackTransformLimit ) {
      finalTransformDistance = last - slideFeedbackTransformLimit;
    }
    return finalTransformDistance;
  }
  start = ( event ) => {
    const { preSlide } = this.props;
    const { activeIndex } = this.state;
    preSlide ? preSlide( { activeIndex, } ) : '';
    this.startX = event.changedTouches[0].clientX;
    this.startY = event.changedTouches[0].clientY;
    this.switchRate = undefined;
    this.preventDocMove = false;
    this.cacheTransform = this.state.transform;
  }
  move = ( event ) => {
    const { layout } = this.props;
    this.moveX = event.changedTouches[0].clientX;
    this.moveY = event.changedTouches[0].clientY;
    let currentMove;
    if ( layout === VERTICAL ) {
      currentMove = this.moveY - this.startY;
    } else if ( layout === HORIZONTAL ) {
      currentMove = this.moveX - this.startX;
    }
    if ( currentMove !== 0 && this.switchRate === undefined ) {
      const direction = currentMove > 0 ? 1 : ( currentMove < 0 ? -1 : 0 );
      //判断是否触边，是否进行slide反馈
      if ( !this.slideFeedbackSwitch( direction ) ) {
        return;
      }
      const otherAxis = layout === HORIZONTAL ? this.moveY - this.startY : ( this.moveX - this.startX );
      this.switchRate = Math.abs( otherAxis / currentMove );
    }
    if ( this.switchRate <= 0.7 ) {
      this.preventDocMove = true;
      let transformDistance = this.whenSlideReachFeedbackTransformLimit( this.cacheTransform + currentMove );
      this.setState({
        transform: transformDistance,
        transition: ''
      })
    }
  }
  end = ( event ) => {
    this.preventDocMove = false;
    const { afterSlide, layout, } = this.props;
    const { transform, } = this.state;
    this.endX = event.changedTouches[0].clientX;
    this.endY = event.changedTouches[0].clientY
    let distance;
    if ( layout === HORIZONTAL ) {
      distance = this.endX - this.startX;
    } else {
      distance = this.endY - this.startY;
    }
    const direction = distance > 0 ? 1 : ( distance < 0 ? -1 : 0 );
    const { transform: newTransform, index: activeIndex}= this.onlySlideInRegion( direction );
    this.setState( {
      transform: newTransform,
      transition: 'transition',
      activeIndex: activeIndex
    },() => {
      afterSlide ? afterSlide( { activeIndex, } ) : '';
    })
  }
  binaryChop = ( { region, target, direction } ) => {
    //此处region由大到小排列
    let left = 0,
      right = region.length - 1,
      mid = Math.floor( ( left + right ) / 2 );
    //迭代的函数同步执行的，不能简单的return
    const iterator = ( mid ) => {
      if ( mid === left ) {
        if( region[mid] === target) {
          return [mid]
        }
        if( region[right] === target) {
          return [right];
        }
        return [left,right];
      } else {
        if ( region[mid] > target ) {
          left = mid;
        }else if ( region[mid] < target ) {
          right = mid ;
        }else {
          return [mid];
        }
        mid = Math.floor( ( left + right ) / 2 );
        //在调用出return
        return iterator( mid );
      }
    }
    const result = iterator( mid );
    if ( result.length === 1 ){
      return {
        transform: region[result[0]],
        index: result[0]
      }
    } else {
      if ( target > region[result[1]] && target < region[result[0]] ) {
        //与左边界超过20(可设置)以上则滑道右边界，否则恢复到左边界
        let distance ;
        if ( direction === -1 ){
          //手指向左滑动
          distance = region[result[0]] - target
        } else if ( direction === 1 ){
          //手指向右滑动
          distance = target - region[result[1]];
        }
        const { transformLimit } = this.props;
        if ( distance >= transformLimit ) {
          if ( direction === -1 ) {
            return {
              transform: region[result[1]],
              index: result[1],
            }
          }else {
            return {
              transform: region[result[0]],
              index: result[0],
            }
          }
        } else {
          if ( direction === -1 ) {
            return {
              transform: region[result[0]],
              index: result[0],
            }
          }else {
            return {
              transform: region[result[1]],
              index: result[1],
            }
          }
        }
      } else if ( target > region[result[0]] ) {
        //超出左边界
        return {
          transform: region[result[0]],
          index: result[0],
        }
      } else if( target < region[result[1]] ){
        //超出右边界
        return {
          transform: region[result[1]],
          index: result[1],
        }
      }
    }
  }
  onlySlideInRegion = ( direction ) => {
    const { region, transform: target } = this.state;
    return this.binaryChop( { region, target, direction } );
  }
  progressRegion = ({size, count}) => {
    const region = [];
    const iterator = (count) =>{
      if(count>0){
        region.push( -size * ( count - 1 ) )
        iterator( count-1 );
      } else {
        region.reverse();
      }
    }
    iterator(count);
    return region;
  }
  //获取元素宽度和高度，因为css中对Slide中的包裹元素设置了width和height都是100%。经历两次render
  getLayout = ( instance ) => {
    if ( !instance ) return;
    const { children, layout, defaultActiveIndex, } = this.props;
    const count = React.Children.count( children );
    const width = instance.offsetWidth,
      height = instance.offsetHeight;
    const size = (layout === HORIZONTAL) ? width : height;
    this.setState( {
      width,
      height,
      region: this.progressRegion( { size, count } ),
      transform: - ( defaultActiveIndex * size ),
    })
  }
  componentDidMount() {
    preventDocMove.call( this );
  }
  componentWillUnmount() {
    offPreventDefault.call( this );
  }
  render() {
    console.log('Slide')
    const { children, style, className, layout, } = this.props;
    const { width, height, transition, transform, } = this.state;
    const count = React.Children.count(children);
    const styleOfSlideCollection = {
      width: `${ layout === HORIZONTAL ? width * count: width }px`,
      height: `${ layout === HORIZONTAL ? height : height * count }px`,
      transform: `translate${ layout === HORIZONTAL ? 'X' : 'Y' }(${ transform }px)`,
      WebkitTransform: `translate${ layout === HORIZONTAL ? 'X' :'Y' }(${ transform }px)`,
      transition: `${ transition ? 'transform .6s cubic-bezier(.53,.54,.02,.99)' : ''}`,
      WebkitTransition: `${ transition ? '-webkit-transform .6s cubic-bezier(.53,.54,.02,.99)' : ''}`
    };
    const wrapClassName = `slide-wrap ${className}`;
    return <div ref={ this.getLayout } className={ wrapClassName } style={ style }>
      <div
        className={`slide-collection`}
        style={styleOfSlideCollection}
        onTouchStart={this.start}
        onTouchMove={this.move}
        onTouchEnd={this.end}
        onTouchCancel={this.end}
      >
        {this.getSlidePane()}
      </div>
    </div>
  }
}
export class SlideItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf( PropTypes.node ),
      PropTypes.node
    ])
  }
  static defaultProps = {
    style: {},
    className: ''
  }
  render(){
    console.log('SlideItem')
    const { width, height, style, className, children, } = this.props;
    const styleOfSlidePane = Object.assign( {}, style, {
      width: `${width}px`,
      height: `${height}px`,
    })
    const sectionClassName = `slide-item ${className}`;
    return <section className={sectionClassName} style={styleOfSlidePane}>
      { children }
    </section>
  }
}
