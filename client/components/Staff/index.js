/**
 * Created by zhouyunkui on 2017/6/16.
 */
/* eslint-disable */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {preventDocMove, offPreventDefault, } from '../../pages/example/common/js/preventDocMove';
class Staff extends Component {
  static propTypes = {
    outputCall: PropTypes.func, // 返回画布的值给外界
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 外界传给画布的值
    update: PropTypes.bool, // 判断是画布触发数值更新(false)，还是用户输入触发数值更新(true)
    width: PropTypes.number.isRequired, // 画布的显示宽度
    height: PropTypes.number.isRequired, // 画布的显示高度
    unit: PropTypes.string, // 画布数值单位
    interValList: PropTypes.arrayOf(PropTypes.object).isRequired, // 数据组
    noCustomized: PropTypes.bool, // 是否有自定义标签
    triggerFocus: PropTypes.func,
    triggerBlur: PropTypes.func,
  }
  static defaultProps = {
    triggerFocus: function () {
      // 聚焦input框
    },
    triggerBlur: function () {

    },
    outputCall: function (value) {
      // 返回画布的值给外界
    },
    value: 0,
    update: false,
    noCustomized: false,
    unit: '',
    interValList: [ {
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
    } ]
  }
  constructor (options) {
    super(options);
    this.scaleRatio = 2;// 缩小率
    this.start = 0;// 起点值(强制为0)
    this.antiCv = 0.015;// 速度减慢速率
    this.whereShowOriginPointOverride = 2;// 坐标起点在显示区域中间
    this.gapLength = this.props.gapLength || 10;// 每格的长度
    this.totalLength = this.getTotalLength();// 数轴总长度
    this.clientWidth = this.scaleRatio * this.props.width;
    this.moveRate = undefined;
    this.cvLimit = 0.45;// 速度限制
    this.moveRateLimit = 0.7;// 移动触发限制
    this.state = {
      clientWidth: this.clientWidth, // 画布的真实宽度 特性width的值
    }
    // 以相对坐标起点位置来计算移动的x轴的距离
    this.currentTranslateX = this.valueIntoX();
    // 缓存当前x轴移动距离
    this.cacheX = this.currentTranslateX;
  }
  strToNumber = () => {
    let arr = this.props.intervalList,
      i = 0;
    for (; i < arr.length; i++ ) {
      arr[i].max = parseFloat(arr[i].max);
      arr[i].min = parseFloat(arr[i].min);
      arr[i].interval = parseFloat(arr[i].interval);
    }
    return arr;
  }
  // 获取数轴总长度
  getTotalLength = () => {
    let temp = 0, list = this.strToNumber(), length = list.length;
    if (parseFloat( list[length - 1].max) === -1) {
      length -= 1;
    }
    for (let j = 0; j < length; j++) {
      temp += ((list[j].max - list[j].min) / list[j].interval) * this.scaleRatio * this.gapLength
    }
    return temp;
  }
  // 兼容
  judgeFnc = () => {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function ( callback ) {
        return setTimeout(callback, 30)
      }
    }
    if ( !window.cancelAnimationFrame ) {
      window.cancelAnimationFrame = function ( n ) {
        clearTimeout( n )
      }
    }
  }
  //计算值落在哪个区间
  valueLocatedInWhichArea = () => {
    let arr = this.strToNumber(),
      value = isNaN( parseInt( this.props.value ) ) ? 0 : this.props.value,
      i = 0;
    for ( i; i < arr.length; i++ ) {
      if ( value < parseFloat( arr[i].max ) ) {
        break;
      }
    }
    return i;
  }
  //计算刻度代表的值
  xIntoValue = () => {
    const { clientWidth } = this.state;
    const visibleWidth = clientWidth / this.whereShowOriginPointOverride;
      return this.getXIntoValue( parseInt( ( visibleWidth - this.cacheX ) / ( this.scaleRatio * this.gapLength ) ) )
  }
  //计算格数代表的值
  //i格数
  getXIntoValue = ( c ) => {
    let arr = this.strToNumber(),
      i = 0,
      v = 0,
      obj = {};
    for ( i; i < arr.length; i++ ) {
      if ( i === 0 ) {
        obj.start = 0;
      } else {
        obj.start = obj.end;
      }
      obj.end = obj.start + parseInt( ( parseFloat( arr[i].max ) - parseFloat( arr[i].min ) ) / parseFloat( arr[i].interval) );
      if ( parseFloat( arr[i].max ) === -1 ) {
        obj.end = -1
      }
      if ( c >= obj.start && c <= obj.end ) {
        v += ( c - obj.start ) * arr[i].interval;
      } else if ( c > obj.start && obj.end === -1 ) {
        //TODO
        //按道理不会出现
      } else if ( c > obj.start && c > obj.end ) {
        v += ( obj.end - obj.start ) * arr[i].interval
      }
    }
    return v;
  }
  calculateGapStickCounts = () => {
    let arr = this.strToNumber(),
      length = arr.length,
      i = 0,
      counts = 0;
    for ( i; i < length - 1; i++ ) {
      counts += ( ( arr[i].max - arr[i].min ) / arr[i].interval )
    }
    if ( parseFloat( arr[length-1].max ) === -1 ) {
      return counts;
    }
    return counts += ( ( arr[length-1].max - arr[length-1].min ) / arr[length - 1].interval )
  }
  valueIntoX = () => {
    const { clientWidth } = this.state;
    let arr = this.strToNumber(),
      j = 0,
      howManyGaps = 0,
      limit = this.valueLocatedInWhichArea(),
      valueTmp = isNaN( parseInt( this.props.value ) ) ? 0 : this.props.value,
      howLongOfThoseGaps,
      fakeOne,
      fakeLimit;
    if ( limit < arr.length ) {
      fakeOne = ( valueTmp - arr[limit].min ) / arr[limit].interval;
      fakeLimit = limit
    } else {
      fakeOne = 100;
      fakeLimit = limit - 1;
    }
    for ( j; j < fakeLimit; j++ ) {
      howManyGaps += ( ( arr[j].max - arr[j].min ) / arr[j].interval )
    }

    howManyGaps += fakeOne;
    howLongOfThoseGaps = howManyGaps * this.scaleRatio * this.gapLength;
    const visibleWidth = clientWidth / this.whereShowOriginPointOverride;
    return parseInt( visibleWidth - howLongOfThoseGaps );
  }
  componentWillReceiveProps ( nextProps ) {
    const { width: preWidth } = this.props,
      { width: nextWidth } = nextProps;
    if( preWidth !== nextWidth ) {
      this.setState( {
        clientWidth: nextWidth * this.scaleRatio
      } )
    }
  }
  componentDidUpdate () {
    const { clientWidth } = this.state;
    const visibleWidth = clientWidth / this.whereShowOriginPointOverride;
    //不让画布移动引起的外部值改变反过来影响画布的移动（会冲突）
    if ( this.props.update ){
      if ( !this.stayOnCustomizeMark ) {
        let current = this.valueIntoX(),
          cacheX;
        if ( current <- ( this.totalLength - visibleWidth ) ) {
          cacheX = this.cacheX + this.scaleRatio * this.gapLength * 10;
        }
        this.draw( () => {
          this.currentTranslateX = this.valueIntoX();
          if ( this.currentTranslateX > visibleWidth ) {
            this.currentTranslateX = visibleWidth;
          } else if ( this.currentTranslateX < - ( this.totalLength - visibleWidth ) ) {
            this.currentTranslateX = - ( this.totalLength - visibleWidth );
          }
          this.cacheX = this.currentTranslateX;
        }, cacheX );
      }
    }
  }
  componentWillUnmount() {
    offPreventDefault.call( this );
  }
  componentDidMount () {
    this.judgeFnc();
    preventDocMove.call( this );
    this.cxt = this.refs.canvas.getContext( "2d" );
    let cacheX,
      { clientWidth } = this.state;
    const visibleWidth = clientWidth / this.whereShowOriginPointOverride;
    if( this.currentTranslateX < - ( this.totalLength - visibleWidth ) ) {
      this.stayOnCustomizeMark = true;
      this.flag = [ - ( this.totalLength - visibleWidth ), - ( this.totalLength - visibleWidth ) ];
      cacheX = this.currentTranslateX + this.scaleRatio * this.gapLength * 10;
    }else{
      this.stayOnCustomizeMark = false;
    }
    this.draw( () => {
      if ( this.currentTranslateX > visibleWidth ) {
        this.currentTranslateX = visibleWidth;
      } else if ( this.currentTranslateX < - ( this.totalLength - visibleWidth ) ) {
        this.currentTranslateX = - ( this.totalLength - visibleWidth );
      }
      this.cacheX = this.currentTranslateX;
    }, cacheX );
  }
  render () {
    let style = {
      width:this.props.width+"px",
      height:this.props.height+"px"
    },styleWrp = {
      overflow: 'visible',
      transform: 'translateZ(0)',
      WebkitTransform: 'translateZ(0)',
    }
    return (
      <div style={styleWrp}>
        <canvas
          ref="canvas"
          height={ this.scaleRatio * this.props.height }
          width={ this.scaleRatio * this.props.width }
          style={ style }
          onTouchStart={ this.handleTouchStart }
          onTouchMove={ this.handleTouchMove }
          onTouchEnd={ this.handleTouchEnd }
        >
          <div>您的浏览器版本过低，不支持显示</div>
        </canvas>
      </div>
    );
  }
  handleTouchStart = ( evt ) => {
    if ( this.req !== undefined ) {
      window.cancelAnimationFrame( this.req );
      this.req = undefined;
    }
    this.moveRate = undefined;
    this.startX = evt.changedTouches[0].clientX;
    this.startY = evt.changedTouches[0].clientY;
    this.moveX = this.startX;
    this.preventDocMove = false;
    this.timeNow = Date.now();
  }
  handleTouchMove = ( evt ) => {
    this.moveX = evt.changedTouches[0].clientX;
    this.moveY = evt.changedTouches[0].clientY;
    let switchLimit = Math.abs( this.moveX - this.startX );
    if ( switchLimit != 0 ) {
      if ( this.moveRate === undefined ) {
        this.moveRate = Math.abs( this.moveY - this.startY ) / switchLimit;
        if ( this.moveX - this.startX <= 0 ) {
          if ( this.flag && this.flag.length != 0 ) {
            //滑道最右边时需要有一个钝感，第一次不触发,大于2次触发
            this.props.triggerFocus();
            //判断是否有自定义选项
            if ( !this.props.noCustomized && !this.stayOnCustomizeMark ) {
              this.whenFirstTimeOnCustomizedMark();
            }
            //绘制到自定义处和之前的绘制不太一样
            this.draw( null, this.cacheX + this.scaleRatio * this.gapLength * 10 );
            return;
          }
        }
        this.flag = [];
      }
    }
    if ( this.moveRate <= this.moveRateLimit ) {
      this.preventDocMove = true;
      if ( this.timeStart === undefined ) {
        this.timeStart = Date.now();
      } else if ( this.timeEnd === undefined ) {
        this.timeEnd = Date.now();
        this.timeGap = this.timeEnd - this.timeStart;
      }
      this.cacheX = this.moveX - this.startX + this.currentTranslateX;
      let judge = false,
        { clientWidth } = this.state;
      const visibleWidth = clientWidth / this.whereShowOriginPointOverride;
      if ( this.cacheX > visibleWidth ) {
        this.cacheX = visibleWidth;
      } else if ( this.cacheX <= - ( this.totalLength - visibleWidth ) ) {
        //滑道最右边时需要有一个钝感，统计滑到边界次数
        this.cacheX = - ( this.totalLength - visibleWidth );
        this.flag.push( this.cacheX );
      } else {
        this.flag = [];
      }
      //滑道最右边时需要有一个钝感，第一次不触发,大于2次触发
      if ( this.flag.length >= 2 ) {
        if ( this.flag[this.flag.length - 2] == - ( this.totalLength - visibleWidth ) && this.flag[this.flag.length - 1] == this.flag[this.flag.length - 2]) {
          judge = true
        }
      }
      //不绘制自定义时，一切照旧
      if ( !judge ) {
        if ( !this.stayOnCustomizeMark ) {
          this.draw( null );
          this.returnDistance();
        }
        this.stayOnCustomizeMark = false;
      }
    }
  }
  handleTouchEnd = ( evt ) => {
    this.preventDocMove = false;
    this.req = undefined;
    this.currentTranslateX = this.cacheX;
    this.timeEnd = Date.now();
    this.cv = Math.abs( this.moveX - this.startX ) / ( this.timeEnd - this.timeNow );
    let flag = this.moveX - this.startX;
    if ( this.cv > this.cvLimit ) {
      this.drawLoop( flag );
    }
  }
  drawLoop = ( flag ) => {
    //这里this.timeGap有可能为undefined
    //因为this.timeGap可能没有在move中赋值
    if ( flag > 0 ) {
      this.cacheX = this.currentTranslateX + this.cv * ( this.timeGap || 30 );
    } else {
      this.cacheX = this.currentTranslateX - this.cv * ( this.timeGap || 30 );
    }
    if ( this.cv >=0 ) {
      let judge = false,
        { clientWidth } = this.state;
      const visibleWidth = clientWidth / this.whereShowOriginPointOverride;
      if ( this.cacheX > visibleWidth ) {
        this.cacheX = visibleWidth;
      } else if ( this.cacheX <= - ( this.totalLength - visibleWidth ) ) {
        this.cacheX = - ( this.totalLength - visibleWidth );
        this.flag.push( this.cacheX );
      }
      if ( this.flag.length >= 2 ) {
        if ( this.flag[this.flag.length - 2] == - ( this.totalLength - visibleWidth ) && this.flag[this.flag.length - 1] == this.flag[this.flag.length - 2] ) {
          judge = true
        }
      }
      if ( !judge ) {
        this.draw( null );
        this.returnDistance();
        this.stayOnCustomizeMark = false;
        this.req = window.requestAnimationFrame( () => {
          this.cv -= this.antiCv;
          this.drawLoop( flag );
        })
      }
    } else {
      if ( this.req !== undefined ) {
        window.cancelAnimationFrame( this.req );
      }
    }
    this.currentTranslateX = this.cacheX;
  }
  returnDistance = () => {
    this.props.outputCall( this.xIntoValue().toFixed(2) );
  }
  whenFirstTimeOnCustomizedMark = () => {
    this.props.outputCall(0);
  }
  //画坐标线
  draw = ( callback, cacheX ) => {
    if ( callback ) callback();
    let temp = this.cacheX;
    if ( typeof cacheX !== 'number' || this.props.noCustomized ) {
      cacheX = this.cacheX;
    } else {
      if ( cacheX != this.cacheX ) {
        temp = this.cacheX - this.scaleRatio * this.gapLength * 10;
        this.stayOnCustomizeMark = true;
      }
    }
    this.cxt.fillStyle = '#fff';
    this.cxt.fillRect( 0, 0, this.scaleRatio * this.props.width, this.scaleRatio * this.props.height );
    this.cxt.beginPath();
    this.cxt.strokeStyle = '#dddddd';
    this.endY = Math.floor( this.scaleRatio * this.props.height );
    this.cxt.moveTo( cacheX, this.endY );
    this.cxt.lineTo( this.totalLength + cacheX, this.endY );
    this.cxt.stroke();
    this.cxt.closePath();
    this.drawHorizonLine();
    this.drawMark( temp );
  }
  //画水平线
  drawHorizonLine = () => {
    this.cxt.beginPath();
    this.cxt.moveTo( 0, this.endY );
    this.cxt.lineTo( this.scaleRatio * this.props.width, this.endY );
    this.cxt.stroke();
    this.cxt.closePath();
  }
  //判断每个区间的边界，用于把刻度变高，和一般的刻度作区分
  drawEveryAreaGap = ( index ) => {
    let arr = this.strToNumber(),
      i = 0,
      obj = {};
    for ( ; i < arr.length; i++ ) {
      if (i === 0 ) {
        obj.start = 0;
      } else {
        obj.start = obj.end;
      }
      obj.end = obj.start + parseInt( ( arr[i].max - arr[i].min ) / arr[i].interval );
      if ( parseFloat( arr[i].max ) === -1 ) {
        obj.end = -1
      }
      if ( ( index === obj.start || index === obj.end ) ) {
        return true
      }
    }
  }
  //画坐标刻度
  drawMark = ( cacheX ) => {
    if ( typeof cacheX != 'number' || this.props.noCustomized ) {
      cacheX = this.cacheX;
    }
    let num = this.calculateGapStickCounts();
    let increaseNum = 0;
    if( !this.props.noCustomized ) {
      increaseNum = 10;
    }
    for ( let i = 0; i < num + 1 + increaseNum ; i++ ) {
      let h = this.getMarkHeight( i ),
        x = this.scaleRatio * i * this.gapLength + Math.floor( cacheX ) + 0.5,
        number = '',
        flag = this.drawEveryAreaGap( i );
      if ( flag ) {
        h = 24
      } else {
        h = 12
      }
      if ( i > num && i < num + 10 ) {
        h = 0;
      }
      this.cxt.restore();
      if ( flag || i == num + 10 ) {
        this.cxt.font = 'normal 100 28px Helvetica';
        this.cxt.textBaseline = 'bottom';
        this.cxt.textAlign = 'center';
        this.cxt.textBaseline = 'bottom';
        this.cxt.fillStyle = '#dddddd';
        if ( i == num + 10 ) {
          number = '自定义'
        } else {
          //number=i*this.gap/*+this.props.unit*/;
          number = this.getXIntoValue( i ) + this.props.unit;
        }
        this.cxt.fillText( number, x, this.endY - 29 );
      }
      this.cxt.beginPath();
      this.cxt.strokeStyle = 'rgba(221,221,221,1)';
      this.cxt.moveTo( x, this.endY - h );
      this.cxt.lineTo( x, this.endY );
      this.cxt.stroke();
      this.cxt.closePath();
      this.cxt.save();
    }
  }
  getMarkHeight = ( i ) => {
    switch ( i % 10 ) {
      case 0:
        return 24;
      case 1:
        return 12;
      case 2:
        return 12
      case 3:
        return 12
      case 4:
        return 12
      case 5:
        return 12
      case 6:
        return 12
      case 7:
        return 12
      case 8:
        return 12
      case 9:
        return 12
      default:
        ;
    }
  }
}
export default Staff;

