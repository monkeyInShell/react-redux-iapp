/**
 * Created by ink on 2018/4/8.
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../redux/action';
import connect from '../../tools/connect';

const Center = (props) => {
  const { title } = props;
  return (
    <div>
      {title}
    </div>
  );
};
Center.propTypes = {
  title: PropTypes.string.isRequired,
};

export default connect({
  title: state => state.center.title,
  router: state => state.router,
}, {
  actions,
})(Center);
