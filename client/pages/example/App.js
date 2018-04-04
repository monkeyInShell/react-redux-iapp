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
const App = (props) => {
  return (<div className="wrap">
    <ul className="sider">
      <li className="top-component flag-dashboard">
        <Link to="/dashboard">
          仪表盘
        </Link>
      </li>
      <li className="top-component flag-imgupload">
        <Link to="/imgupload">
          图片上传
        </Link>
      </li>
      <li className="top-component flag-itemmove">
        <Link to="/itemmove">
          列表项可滑动
        </Link>
      </li>
      <li className="top-component flag-pullrefresh">
        <Link to="/pullrefresh">
          下拉刷新
        </Link>
      </li>
      <li className="top-component flag-slide">
        <Link to="/slide">
          幻灯片
        </Link>
      </li>
      <li className="top-component flag-staff">
        <Link to="/staff">
          画布标尺
        </Link>
      </li>
      <li className="top-component flag-uploadmore">
        <Link to="/uploadmore">
          上拉加载更多
        </Link>
      </li>
    </ul>
    <div className="content">
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/imgupload" component={ImgUpload}/>
      <Route path="/itemmove" component={ItemMove}/>
      <Route path="/pullrefresh" component={PullRefresh}/>
      <Route path="/slide" component={Slide}/>
      <Route path="/staff" component={Staff}/>
      <Route path="/uploadmore" component={UploadMore}/>
    </div>
  </div>)
}
export default App
