/**
 * Created by ink on 2018/4/9.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DevTools from '../../tools/DevTools/index';

const Content = (props) => {
  const { component: CustomerContent } = props;
  return (
    <Fragment>
      <CustomerContent />
      <DevTools />
    </Fragment>
  );
};
Content.displayName = 'LocalRoot';
Content.propTypes = {
  component: PropTypes.func.isRequired,
};
export default Content;
