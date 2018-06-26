
import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = props => (
  <html lang="zh-CN">
    <head>
      <meta charSet="utf-8" />
      <meta name="description" content="react app" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
      <meta name="format-detection" content="telephone=no" />
      <title>
        {props.title}
      </title>
      {props.links}
    </head>
    <body>
      <div id="bd" className="bd">
        {props.children}
      </div>
      {props.scripts}
    </body>
  </html>
);
Skeleton.propTypes = {
  title: PropTypes.string,
  links: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  scripts: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};
Skeleton.defaultProps = {
  title: '',
  links: null,
  children: null,
  scripts: null,
};
export default Skeleton;
