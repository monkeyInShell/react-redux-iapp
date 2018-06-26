import React from 'react';
import express from 'express';
import { toSream, setResHeaders } from '../react';
import Skeleton from '../views/skeleton';
import Home from '../views/home';

const router = express.Router();
router.get('/', (req, res) => {
  // 可以根据路径，针对某一个页面进行服务端渲染
  const Html = () => (
    <Skeleton
      title="同构项目"
    >
      <Home />
    </Skeleton>
  );
  toSream(<Html />).pipe(setResHeaders(res));
});

export default {
  router,
};
