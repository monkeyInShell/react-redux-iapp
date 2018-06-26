/**
 * Created by zhouyunkui on 2017/6/21.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.less';

class Dashboard extends Component {
  static propTypes = {
    width: PropTypes.number, // 画布显示的宽度
    height: PropTypes.number, // 画布显示的高度
    className: PropTypes.string,
    scaleRadio: PropTypes.number, // 画布的缩放率
    anticlockwise: PropTypes.bool, // 顺时针还是逆时针画
    score: PropTypes.number, // 分数
    cuStyle: PropTypes.object, // 样式
  }

  static defaultProps = {
    width: 210,
    height: 210,
    className: '',
    scaleRadio: 2,
    anticlockwise: false,
    score: 100,
    cuStyle: {},
  }

  constructor(options) {
    super(options);
    this.state = {
    };
  }

  componentDidMount() {
    this.polyfill();
    const { scaleRadio, anticlockwise } = this.props;
    this.pen = this.canvas.getContext('2d');
    // 每度代表的分数
    this.scoreAngleRadio = 125 / 30;
    // 角度变化率
    this.angleRadio = 3;
    // 影子圆结束角，根据业务来定
    this.endAngleStart = -210;
    // 每个刻度间隔
    this.angleGap = 30;
    // 和圆大小相关
    this.x = scaleRadio * 105;
    this.y = scaleRadio * 100;
    this.radius = scaleRadio * 95;
    // 实体圆开始角
    this.startAngle = (Math.PI / 180) * (180 - this.angleGap);
    // 实体圆结束角
    this.endAngle = Math.PI / 180;
    // 顺时针还是逆时针
    this.anticlockwise = anticlockwise;
    // 圆弧宽度
    this.lineWidth = scaleRadio * 10;
    // 开始点坐标
    const startCosAngel = 1 - Math.cos(Math.PI * this.angleGap / 180);
    this.startPointX = scaleRadio * startCosAngel * this.radius + this.lineWidth;
    const startSinAngel = 1 + Math.sin(Math.PI * this.angleGap / 180);
    this.startPointY = scaleRadio * startSinAngel * this.radius + this.lineWidth;
    // 结束点坐标
    const endCosAngel = 1 + Math.cos(Math.PI * this.angleGap / 180);
    this.endPointX = scaleRadio * this.radius * endCosAngel + this.lineWidth;
    this.endPointY = this.startPointY;
    // 颜色渐变
    const arg1 = (this.startPointX - 3 * this.lineWidth) / scaleRadio;
    const arg2 = (this.startPointY - this.lineWidth) / scaleRadio;
    const arg3 = (this.endPointX - this.lineWidth) / scaleRadio;
    const arg4 = (this.endPointY - this.lineWidth) / scaleRadio;
    this.lineargradient = this.pen.createLinearGradient(arg1, arg2, arg3, arg4);
    this.loadImg();
  }

  getRef = (ref) => {
    this.canvas = ref;
  }

  polyfill = () => {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (fn) {
        return setTimeout(fn, 30);
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (n) {
        return window.clearTimeout(n);
      };
    }
  }

  loadImg = () => {
    this.img = new Image();
    this.img.src = '//static.jdpay.com/m-external-assets-housekeeper/public/img/dashboardtext.png';

    this.img.onload = () => {
      this.beginDraw();
    };
    this.img.onerror = () => {
      this.beginDraw();
    };
    if (this.img.complete) {
      this.beginDraw();
    }
  }

  beginDraw = () => {
    this.drawDashBoardBackCircle(this.endAngleStart);
  }

  // 影子圆绘制
  drawDashBoardBackCircle = (n) => {
    const {
      width, height, scaleRadio, score,
    } = this.props;
    let innerN = n;
    this.pen.clearRect(0, 0, width * scaleRadio, height * scaleRadio);
    this.pen.beginPath();
    this.pen.lineWidth = this.lineWidth;
    this.pen.lineCap = 'round';
    const arg5 = this.endAngle * this.angleGap;
    this.pen.arc(this.x, this.y, this.radius, this.startAngle, arg5, this.anticlockwise);
    this.pen.strokeStyle = '#ededed';
    this.pen.stroke();
    this.pen.closePath();
    this.drawDashBoardCircle(n);
    // 刻度盘值
    this.drawDashBoardTextImg();
    // 中间体检分数
    this.drawDashBoardCenterText(innerN);
    const timer = window.requestAnimationFrame(() => {
      if (innerN >= ((score / this.scoreAngleRadio) + this.endAngleStart)) {
        return window.cancelAnimationFrame(timer);
      }
      innerN += this.angleRadio;
      return this.drawDashBoardBackCircle(innerN);
    });
  }

  // 实体圆绘制
  drawDashBoardCircle = (n) => {
    this.pen.beginPath();
    this.pen.lineCap = 'round';
    const arg5 = this.endAngle * n;
    this.pen.arc(this.x, this.y, this.radius, this.startAngle, arg5, this.anticlockwise);
    this.lineargradient.addColorStop(0, 'rgb( 250, 114, 75)');
    this.lineargradient.addColorStop(0.6, 'rgb( 255, 215, 56)');
    this.lineargradient.addColorStop(1, 'rgb( 16, 202, 115)');
    this.pen.strokeStyle = this.lineargradient;
    this.pen.stroke();
    this.pen.closePath();
  }

  drawDashBoardTextImg = () => {
    try {
      this.pen.drawImage(this.img, 0, 0, 338, 272, 49.5, 40.5, 325, 262);
    } catch (e) {
      console.log(e);
    }
  }

  handleColor = (n) => {
    const currentAngleGap = window.parseInt(n - this.endAngleStart);
    const dist1 = 110;
    const dist2 = 130;
    const preHalfEveryAngleX = (255 - 250) / dist1;
    const preHalfEveryAngleY = (215 - 114) / dist1;
    const preHalfEveryAngleZ = (56 - 75) / dist1;
    const suffixHalfEveryAngleX = (16 - 255) / dist2;
    const suffixHalfEveryAngleY = (202 - 215) / dist2;
    const suffixHalfEveryAngleZ = (115 - 56) / dist2;
    let str = '';
    if (currentAngleGap <= dist1) {
      str = `rgb(${236 + window.parseInt(preHalfEveryAngleX * currentAngleGap)},${64 + window.parseInt(preHalfEveryAngleY * currentAngleGap)},${65 + window.parseInt(preHalfEveryAngleZ * currentAngleGap)})`;
    } else {
      str = `rgb(${255 + window.parseInt(suffixHalfEveryAngleX * (currentAngleGap - dist1))},${215 + window.parseInt(suffixHalfEveryAngleY * (currentAngleGap - dist1))},${56 + window.parseInt(suffixHalfEveryAngleZ * (currentAngleGap - dist1))})`;
    }
    return str;
  }

  drawDashBoardCenterText = (n) => {
    const { score: _score } = this.props;
    let score = window.parseInt((n - this.endAngleStart) * this.scoreAngleRadio);
    if (score > _score) {
      score = _score;
    }
    this.pen.textAlign = 'center';
    this.pen.font = 'normal 100 100px Helvetica';
    this.pen.textBaseline = 'bottom';
    this.pen.fillStyle = this.handleColor(n);
    this.pen.fillText(score, this.x, this.y + 35);
    this.pen.font = 'normal 100 28px Helvetica';
    this.pen.fillText('智能分析 合理配置', this.x, this.y + 75);
    this.pen.font = 'normal 100 24px Helvetica';
    this.pen.fillStyle = '#999';
  }

  render() {
    const {
      width, height, scaleRadio, className, cuStyle: _style,
    } = this.props;
    const style = Object.assign({}, _style, {
      width,
      height,
    });
    return (
      <div className={className ? `${className} canvas-wrap` : 'canvas-wrap'} style={style}>
        <canvas
          style={style}
          ref={this.getRef}
          width={scaleRadio * width}
          height={scaleRadio * height}
        />
      </div>
    );
  }
}
export default Dashboard;
