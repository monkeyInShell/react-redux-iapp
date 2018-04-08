/**
 * Created by ink on 2018/4/8.
 */
import React, {Fragment} from 'react'
import Center from './Center'
import Home from './Home'
import {Switch, Route, Link} from 'react-router-dom'

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
