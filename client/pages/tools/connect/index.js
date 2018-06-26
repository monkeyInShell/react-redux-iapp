/**
 * Created by ink on 2018/3/6.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// PipeConnect({
//  someProps: (state) => {
//    return state.get('someProps')
//  }
// }, {
//  Actions: action,
//  AppAction: appAction
// })(component)
const pipeConnect = (props, actions) => {
  const mapStateToProps = (state) => {
    const obj = {};
    Object.keys(props).forEach((key) => {
      const v = props[key];
      if (typeof v !== 'function') {
        obj[key] = v;
      } else {
        obj[key] = v(state);
      }
    });
    return obj;
  };
  const mapDispatchToProps = (dispatch) => {
    const obj = {};
    Object.keys(actions).forEach((key) => {
      obj[key] = bindActionCreators(actions[key], dispatch);
    });
    return obj;
  };
  return component => connect(mapStateToProps, mapDispatchToProps)(component);
};
export default pipeConnect;
