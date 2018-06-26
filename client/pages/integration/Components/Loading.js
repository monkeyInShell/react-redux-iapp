/**
 * Created by ink on 2018/4/11.
 */
import React from 'react';
import PropTypes from 'prop-types';

function Loading(props) {
  let content = '';
  const { error, timedOut, pastDelay } = props;
  if (error) {
    content = props.error;
  } else if (timedOut) {
    content = '加载超时';
  } else if (pastDelay) {
    content = '加载中...';
  } else {
    content = '加载中...';
  }
  return (
    <div>
      {content}
    </div>
  );
}
Loading.propTypes = {
  error: PropTypes.string,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
};

Loading.defaultProps = {
  error: '',
  timedOut: false,
  pastDelay: false,
};

export default Loading;
