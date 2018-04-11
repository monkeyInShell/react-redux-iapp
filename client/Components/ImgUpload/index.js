/**
 * Created by zhouyunkui on 2017/6/26.
 */
/* eslint-disable */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import EXIF from './exif-js';
import './ImgUpload.less';
class ImgUpload extends Component {
  static propTypes = {
    style: PropTypes.object,//可以设置画布的显示宽、高
    className: PropTypes.string,
    width: PropTypes.number,//画布的实际宽度
    height: PropTypes.number,//画布的实际高度
    onChange: PropTypes.func,//组件input变化时，获取file对象
    onDraw: PropTypes.func,//绘制完毕canvas后，获取canvas对象
  }
  //可通过设置canvas的宽高来对图片进行压缩
  static defaultProps = {
    style: {
      width:200,
      height:200,
    },
    className: '',
    width: 300,
    height: 300,
    onChange: ( file ) => {

    },
    onDraw: ( canvas ) => {

    },
  }
  constructor( options ) {
    super( options );
    this.contextPen = null;
    this.contextSet = {
      degree: 0,
      translateX: 0,
      translateY: 0,
    }
    this.realWidth = 0;
    this.realHeight = 0;
    this.degree = 0;
    this.x = 0;
    this.y = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.color = "#fff";
  }
  onChange = ( file ) => {
    const { onChange, } = this.props;
    onChange( file );
  }
  onDraw = ( canvas ) => {
    const { onDraw, } = this.props;
    onDraw( canvas );
  }
  componentDidMount() {
    this.inputFile = this.refs.inputFile;
    this.canvas = this.refs.canvas;
    this.contextPen = this.canvas.getContext( "2d" );
  }
  handleChange = ( evt ) => {
    const file = evt.target.files[0];
    this.onChange( file );
    if ( file ) {
      const reader = new FileReader();
      reader.readAsDataURL( file );
      reader.onload = ( evt ) => {
        EXIF.getData( file, () => {
          let orient = 1,
            preOrient = orient;
          orient = EXIF.getTag( file, 'Orientation' ) || 1;
          const img = new Image();
          img.src = reader.result;
          img.onload = ( evt ) => {
            this.draw( img, orient, preOrient );
            this.onDraw( this.canvas );
          }
        } )
      }
    }
  }
  draw = ( img, orientation, preOrientation ) => {
    this.img = img;
    this.imgNaturalWidth = this.img.naturalWidth;
    this.imgNaturalHeight = this.img.naturalHeight;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.orientation = orientation;
    this.preOrientation = preOrientation;
    this._beginDraw();
    this._setTransformInfo();
    this._setTransform();
    this.canvas.style.visibility = "visible";
    this.contextPen.drawImage( this.img, 0, 0, this.imgNaturalWidth, this.imgNaturalHeight, this.x, this.y, this.realWidth, this.realHeight );
  }
  _beginDraw = () => {
      this.canvas.style.visibility = "hidden";
    // this.context.fillStyle = this.color;
    // this.context.fillRect( 0, 0, this.canvasWidth, this.canvasHeight );
    this.contextPen.clearRect( 0, 0, this.canvasWidth, this.canvasHeight )
  }
  _calculateHW = ( reverse ) => {
    if ( reverse ) {
      var temp = this.canvasWidth;
      this.canvasWidth = this.canvasHeight;
      this.canvasHeight = temp;
    }
    var radioW = this.imgNaturalWidth / this.canvasWidth,
      radioH = this.imgNaturalHeight / this.canvasHeight;
    if ( radioW < radioH ){
      this.realHeight = this.canvasHeight;
      this.realWidth = this.imgNaturalWidth / radioH;
      if ( this.realWidth > this.canvasWidth ) {
        this.realWidth = this.canvasWidth;
      }
    } else {
      this.realWidth = this.canvasWidth;
      this.realHeight = this.imgNaturalHeight / radioW;
      if ( this.realHeight > this.canvasHeight ) {
        this.realHeight = this.canvasHeight;
      }
    }
    this.x = ( this.canvasWidth - this.realWidth ) / 2;
    this.y = ( this.canvasHeight - this.realHeight ) / 2;
  }
  _setTransformInfo = () => {
    switch ( this.orientation ) {
      case 6:
        this.degree = Math.PI / 2;
        this._calculateHW( true );
        this.translateY = - ( ( ( this.canvasHeight + this.realHeight ) / 2 ) + this.y );
        this.translateX = 0;
        break;
      case 3:
        this.degree = Math.PI;
        this._calculateHW( false );
        this.translateX = - ( ( ( this.canvasWidth + this.realWidth ) / 2 ) + this.x );
        this.translateY = -( ( ( this.canvasHeight + this.realHeight ) / 2 ) + this.y );
        break;
      case 8:
        this.degree = Math.PI*1.5;
        this._calculateHW( true );
        this.translateX = - ( ( ( this.canvasWidth + this.realWidth ) / 2 ) );
        this.translateY = this.y;
        break;
      default:
        this.degree = 0;
        this._calculateHW( false );
        this.translateX = 0;
        this.translateY = 0;
    }
  }
  _setTransform = () => {
    //当上个canvas方向为6或者8时，当前的为1，防止画布清除不掉
    if ( ( this.preOrientation === 6 || this.preOrientation === 8 ) && this.orientation === 1 ) {
      var parent = this.canvas.parentNode;
      parent.removeChild( this.canvas );
      var newChild = document.createElement("canvas");
      newChild.width = this.canvasWidth;
      newChild.height = this.canvasHeight;
      parent.appendChild( newChild );
      this.contextPen = newChild.getContext( "2d" );
      this.canvas = newChild;
      this.contextSet.translateX = 0;
      this.contextSet.translateY = 0;
      this.contextSet.degree = 0;
      this.contextPen.fillStyle = this.color;
      this.contextPen.fillRect( 0, 0, this.canvasWidth, this.canvasHeight );
    }
    this.contextPen.translate( - this.contextSet.translateX, - this.contextSet.translateY );
    this.contextPen.rotate( - this.contextSet.degree );
    this.contextPen.rotate( this.degree );
    this.contextPen.translate( this.translateX, this.translateY );
    this.contextSet.degree = this.degree;
    this.contextSet.translateX = this.translateX;
    this.contextSet.translateY = this.translateY;
  };
  render() {
    const { width, height, style, className, } = this.props;
    return <section className="img-upload-wrap">
      <section className="img-upload-input-file-wrap">
        <input ref='inputFile' type="file" className="img-upload-input-file" onChange={ this.handleChange }/>
      </section>
      <section className="img-upload-canvas-wrap">
        <canvas ref="canvas" className={ className } style={ style } width={ width } height={ height } ></canvas>
      </section>
    </section>
  }
}
export default ImgUpload