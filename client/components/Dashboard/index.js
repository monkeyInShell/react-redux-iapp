/**
 * Created by zhouyunkui on 2017/6/21.
 */
/* eslint-disable */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.less';
class Dashboard extends Component {
  static propsTypes = {
    width: PropTypes.number,//画布显示的宽度
    height: PropTypes.number,//画布显示的高度
    className: PropTypes.string,
    style: PropTypes.object,
    scaleRadio: PropTypes.number,//画布的缩放率
    anticlockwise: PropTypes.bool,//顺时针还是逆时针画
    score: PropTypes.number,//分数

  }
  static defaultProps = {
    width: 210,
    height: 210,
    className: '',
    style: {},
    scaleRadio: 2,
    anticlockwise: false,
    score: 100
  }
  constructor( options ) {
    super( options );
    this.state = {

    }
  }
  polyfill = () => {
    if( !window.requestAnimationFrame ) {
      window.requestAnimationFrame = function ( fn ) {
        return setTimeout( fn, 30)
      }
    }
    if ( !window.cancelAnimationFrame ) {
      window.cancelAnimationFrame = function ( n ) {
        return window.clearTimeout( n )
      }
    }
  }
  loadImg = () => {
    this.img = new Image();
    this.img.src = '//static.jdpay.com/m-external-assets-housekeeper/public/img/dashboardtext.png';

    this.img.onload = () => {
      this.beginDraw();
    }
    this.img.onerror = () => {
      this.beginDraw();
    }
    if ( this.img.complete ) {
      this.beginDraw();
    }
  }
  componentDidMount() {
    this.polyfill();
    const { scaleRadio, anticlockwise, } = this.props;
    this.canvas = this.refs.canvas;
    this.pen = this.canvas.getContext('2d');
    //每度代表的分数
    this.scoreAngleRadio = 125/30;
    //角度变化率
    this.angleRadio = 3;
    //影子圆结束角，根据业务来定
    this.endAngleStart = -210;
    //每个刻度间隔
    this.angleGap = 30;
    //和圆大小相关
    this.x = scaleRadio * 105;
    this.y = scaleRadio * 100;
    this.radius = scaleRadio * 95;
    //实体圆开始角
    this.startAngle = ( Math.PI / 180 ) * ( 180 - this.angleGap );
    //实体圆结束角
    this.endAngle = Math.PI / 180;
    //顺时针还是逆时针
    this.anticlockwise = anticlockwise;
    //圆弧宽度
    this.lineWidth = scaleRadio * 10;
    //开始点坐标
    this.startPointX = scaleRadio * ( 1 - Math.cos( Math.PI * this.angleGap / 180 ) ) * this.radius + this.lineWidth;
    this.startPointY = scaleRadio * ( 1 + Math.sin( Math.PI * this.angleGap / 180 ) ) * this.radius + this.lineWidth;
    // 结束点坐标
    this.endPointX = scaleRadio * this.radius * ( 1 + Math.cos( Math.PI * this.angleGap / 180 ) ) + this.lineWidth;
    this.endPointY = this.startPointY;
    //颜色渐变
    this.lineargradient = this.pen.createLinearGradient( ( this.startPointX - 3 * this.lineWidth ) / scaleRadio, ( this.startPointY - this.lineWidth ) / scaleRadio, ( this.endPointX - this.lineWidth ) / scaleRadio, ( this.endPointY - this.lineWidth ) / scaleRadio );
    this.loadImg();
  }
  beginDraw = () => {
    this.drawDashBoardBackCircle(this.endAngleStart);
  }
  //影子圆绘制
  drawDashBoardBackCircle = ( n ) => {
    const { width, height, scaleRadio, score, } = this.props;
    this.pen.clearRect( 0, 0, width * scaleRadio, height * scaleRadio, );
    this.pen.beginPath();
    this.pen.lineWidth = this.lineWidth;
    this.pen.lineCap = 'round';
    this.pen.arc( this.x, this.y, this.radius, this.startAngle, this.endAngle * this.angleGap, this.anticlockwise );
    this.pen.strokeStyle = '#ededed';
    this.pen.stroke();
    this.pen.closePath();
    this.drawDashBoardCircle( n );
    //刻度盘值
    this.drawDashBoardTextImg();
    //中间体检分数
    this.drawDashBoardCenterText( n );
    const timer = window.requestAnimationFrame( () => {
      if ( n >= ( ( score / this.scoreAngleRadio ) + this.endAngleStart ) ) {
        return window.cancelAnimationFrame( timer );
      }
      n += this.angleRadio;
      this.drawDashBoardBackCircle( n );
    })
  }
  //实体圆绘制
  drawDashBoardCircle = ( n ) => {
    this.pen.beginPath();
    this.pen.lineCap = 'round';
    this.pen.arc( this.x, this.y, this.radius, this.startAngle, this.endAngle * n, this.anticlockwise );
    this.lineargradient.addColorStop( 0, 'rgb( 250, 114, 75)');
    this.lineargradient.addColorStop( 0.6, 'rgb( 255, 215, 56)');
    this.lineargradient.addColorStop( 1, 'rgb( 16, 202, 115)');
    this.pen.strokeStyle = this.lineargradient;
    this.pen.stroke();
    this.pen.closePath();
  }
  drawDashBoardTextImg = () => {
    try {
      this.pen.drawImage( this.img, 0, 0, 338, 272, 49.5, 40.5, 325, 262 );
    } catch ( e ) {
      console.log( e );
    }
  }
  handleColor = ( n ) => {
    const currentAngleGap = parseInt( n - this.endAngleStart ),
      dist1 = 110,
      dist2 = 130,
      preHalfEveryAngleX = ( 255 - 250 ) / dist1,
      preHalfEveryAngleY = ( 215 - 114 ) / dist1,
      preHalfEveryAngleZ = ( 56 - 75 ) / dist1,
      suffixHalfEveryAngleX = ( 16 - 255 ) / dist2,
      suffixHalfEveryAngleY = ( 202 - 215 ) / dist2,
      suffixHalfEveryAngleZ = ( 115 - 56 ) / dist2;
   let str = '';
    if ( currentAngleGap <= dist1 ) {
      str = `rgb(${ 236 + parseInt( preHalfEveryAngleX * currentAngleGap ) },${ 64 + parseInt( preHalfEveryAngleY * currentAngleGap ) },${ 65 + parseInt( preHalfEveryAngleZ * currentAngleGap ) })`
    } else {
      str = `rgb(${ 255 +parseInt( suffixHalfEveryAngleX * ( currentAngleGap - dist11 ) ) },${ 215 + parseInt( suffixHalfEveryAngleY * ( currentAngleGap - dist1 ) ) },${ 56 + parseInt( suffixHalfEveryAngleZ * ( currentAngleGap - dist1 ) ) })`
    }
    return str;
  }
  drawDashBoardCenterText = ( n ) => {
    const { score: _score, text, } = this.props;
    let score = parseInt( ( n - this.endAngleStart ) * this.scoreAngleRadio );
    if ( score > _score ) {
      score = _score;
    }
    this.pen.textAlign = 'center';
    this.pen.font = 'normal 100 100px Helvetica';
    this.pen.textBaseline = 'bottom';
    this.pen.fillStyle = this.handleColor( n );
    this.pen.fillText( score, this.x, this.y + 35 );
    this.pen.font = 'normal 100 28px Helvetica';
    this.pen.fillText( '智能分析 合理配置', this.x, this.y + 75 );
    this.pen.font = 'normal 100 24px Helvetica';
    this.pen.fillStyle = '#999';
  }
  render() {
    const { width, height, scaleRadio, className, style: _style, } = this.props;
    const style = Object.assign( {}, _style, {
      width,
      height,
    })
    return <div className={ className?`${ className } canvas-wrap` : 'canvas-wrap' } style={ style }>
      <canvas style={ style } ref = 'canvas' width={ scaleRadio * width } height={ scaleRadio * height }></canvas>
    </div>
  }
}
export default Dashboard;