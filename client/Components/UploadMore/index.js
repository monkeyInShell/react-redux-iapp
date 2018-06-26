/**
 * Created by zhouyunkui on 2017/6/21.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UploadMore.less';
/* eslint-disable */
class UploadMore extends Component {
  static propTypes = {
    reference: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    request: PropTypes.func,
    height: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
  }

  static defaultProps = {
    reference: typeof window === 'undefined' ? {} : window,
    request: (callback) => {

    },
    height: 50,
    style: {},
    className: '',
  }

  constructor(options) {
    super(options);
    this.state = {
      text: '加载更多',
      loading: false,
    };
  }

  detectOffsetTop = () => {
    const { reference } = this.props;
    let temp = this.uploadMore,
      _temp = reference,
      offsetTop = 0,
      _offsetTop = 0;
    while (temp !== null) {
      offsetTop += temp.offsetTop;
      temp = temp.offsetParent;
    }
    while (_temp !== null) {
      _offsetTop += _temp.offsetTop;
      _temp = _temp.offsetParent;
    }
    return offsetTop - _offsetTop;
  }

  detectReferenceScrollTop = () => {
    const { reference } = this.props;
    return reference.scrollTop;
  }

  detectReferenceOffsetHeight = () => {
    const { reference } = this.props;
    return reference.offsetHeight || reference.innerHeight;
  }

  judgeWhetherRequestOrNot = () => {
    const { loading } = this.state;
    const { request } = this.props;
    const referenceOffsetHeight = this.detectReferenceOffsetHeight();
    const referenceScrollTop = this.detectReferenceScrollTop();
    const offsetTop = this.detectOffsetTop();
    const distance = offsetTop - referenceScrollTop;
    if (distance <= referenceOffsetHeight && distance > 0 && !loading) {
      if (!((this.cacheDistance + this.offsetHeight / 2) <= referenceOffsetHeight)) {
        this.setState({
          text: '正在加载...',
          loading: true,
        }, () => {
          request(this.uploadMoreHandleRequestResult);
        });
      }
    }
    this.cacheDistance = distance;
  }

  uploadMoreHandleRequestResult = ({ text, loading }) => {
    this.setState({
      text,
      loading,
    });
  }

  bindScrollToReference = () => {
    const { reference } = this.props;
    reference.onscroll = (evt) => {
      this.judgeWhetherRequestOrNot();
    };
  }

  componentWillUnmount() {
    const { reference } = this.props;
    reference.onscroll = null;
  }

  componentDidMount() {
    this.uploadMore = this.refs.uploadMore;
    this.offsetHeight = this.uploadMore.offsetHeight;
    this.judgeWhetherRequestOrNot();
    this.bindScrollToReference();
  }

  render() {
    const { height, style, className } = this.props;
    const { text, loading } = this.state;
    const _style = Object.assign({}, {
      height,
    }, style);
    return (
      <div ref="uploadMore" className={className ? `${className} upload-more` : 'upload-more'} style={_style}>
        <span>
          {' '}
          { text }
          {' '}
        </span>
        { loading ? <div className="icon-load" /> : '' }
      </div>
    );
  }
}
export default UploadMore;
