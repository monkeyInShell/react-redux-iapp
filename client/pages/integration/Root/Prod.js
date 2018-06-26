/**
 * Created by ink on 2018/4/9.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Content = (props) => {
  const { component: CustomerContent } = props;
  return <CustomerContent />;
};
Content.displayName = 'ProdRoot';
Content.propTypes = {
  component: PropTypes.func.isRequired,
};
export default Content;
