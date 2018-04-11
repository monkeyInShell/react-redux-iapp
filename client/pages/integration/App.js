/**
 * Created by ink on 2018/4/8.
 */
import React, {Fragment} from 'react'
import Loading from './Components/Loading'
import {Switch, Route, Link} from 'react-router-dom'
import load from '../tools/lazyLoad/'
const lazyLoad = load('integration/', Loading)
const Home = lazyLoad('Home')
const Center = lazyLoad('Center')
const App = (props) => {
  return (
    <Fragment>
      <div>
        <Link to='/home'>首页</Link>
      </div>
      <div>
        <Link to='/center'>用户中心</Link>
      </div>
      <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path='/center' component={Center}></Route>
      </Switch>
    </Fragment>
  )
}
export default App
