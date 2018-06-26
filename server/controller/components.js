

import React from 'react';
import { StaticRouter } from 'react-router';
import express from 'express';
import { toSream, setResHeaders } from '../react';
import mapReactAssets from '../utils/mapReactAssets';
import Component from '../../client/pages/example/App';
import Skeleton from '../views/skeleton';

const router = express.Router();
router.get('*', (req, res) => {
  // 可以根据路径，针对某一个页面进行服务端渲染
  const location = `${req.baseUrl}${req.path}`;
  const Html = () => (
    <Skeleton
      title="react移动端组件"
      links={mapReactAssets('components/index.css')}
      scripts={mapReactAssets('components/index.js')}
    >
      <StaticRouter
        location={location}
        context={{}}
        basename={req.baseUrl}
      >
        <Component />
      </StaticRouter>
    </Skeleton>
  );
  toSream(<Html />).pipe(setResHeaders(res));
});

export default {
  router,
};
