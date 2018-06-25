'use strict';
import React from 'react'
import {Link} from 'react-router-dom'
import {StaticRouter} from 'react-router'
const Home = (props) => {
  return <StaticRouter context={{}}>
    <React.Fragment>
      <span><Link to="/p/components">react移动端常见组件</Link></span>
      <span style={{marginLeft: '30px'}}><Link to="/p/integration">整合redux</Link></span>
    </React.Fragment>
  </StaticRouter>
}
export default Home
