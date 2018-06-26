/**
 * Created by zhouyunkui on 2017/6/15.
 */
const switchStatus = function () {
  const { match } = this.props;
  const targetLink = document.querySelector(`.flag${match.path.replace(/\//g, '-')}`);
  const allLink = [...document.querySelectorAll('.sider .top-component')];
  allLink.forEach(link => link.classList.remove('active'));
  targetLink.classList.add('active');
};
export default switchStatus;
