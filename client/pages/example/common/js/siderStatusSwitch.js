/**
 * Created by zhouyunkui on 2017/6/15.
 */
const switchStatus = function () {
  const {match} = this.props;
  let targetLink = document.querySelector(`.flag${match.path.replace(/\//g, '-')}`);
  let allLink = [...document.querySelectorAll('.sider .top-component')];
  allLink.map((link, index) => {
    link.classList.remove('active');
  })
  targetLink.classList.add('active');
}
export default switchStatus
