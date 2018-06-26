/**
 * Created by zhouyunkui on 2017/6/20.
 */
import { Component } from 'react';
import switchStatus from '../common/js/siderStatusSwitch';

class Hoc extends Component {
  componentDidMount() {
    switchStatus.call(this);
  }

  render() {
    return null;
  }
}
export default Hoc;
