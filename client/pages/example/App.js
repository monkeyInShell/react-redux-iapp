/**
 * Created by ink on 2018/3/29.
 */
import './style/index.less'
import React from 'react'
import {Route, Link} from 'react-router-dom'
import Dashboard from './Dashboard'
import ImgUpload from './ImgUpload'
import ItemMove from './ItemMove'
import PullRefresh from './PullRefresh'
import Slide from './Slide'
import Staff from './Staff'
import UploadMore from './UploadMore'
const routeConfig = [{
  path: '/dashboard',
  component: Dashboard,
  title: '仪表盘'
}, {
  path: '/imgupload',
  component: ImgUpload,
  title: '图片上传'
}, {
  path: '/itemmove',
  component: ItemMove,
  title: '列表项可滑动'
}, {
  path: '/pullrefresh',
  component: PullRefresh,
  title: '下拉刷新'
}, {
  path: '/slide',
  component: Slide,
  title: '幻灯片'
}, {
  path: '/staff',
  component: Staff,
  title: '画布标尺'
}, {
  path: '/uploadmore',
  component: UploadMore,
  title: '上拉加载更多'
}]
const liCollection = []
const routes = []
for (let i = 0; i < routeConfig.length; i++) {
  const item = routeConfig[i]
  liCollection.push(<li key={item.path} className={`top-component flag${item.path.replace('/', '-')}`}>
    <Link to={item.path}>
      {item.title}
    </Link>
  </li>)
  routes.push(<Route key={item.path} path={item.path} component={item.component}/>)
}
const App = (props) => {
  return (<div className="wrap">
    <ul className="sider">
      {liCollection}
    </ul>
    <div className="content">
      {routes}
    </div>
  </div>)
}
export default App
