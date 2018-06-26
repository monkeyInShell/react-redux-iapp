/**
 * Created by ink on 2018/3/29.
 */
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import main from './routes/main';

const config = require('config');

const app = express();
app.use(helmet());
console.log((config.injectDevelopmentTools && config.injectDevelopmentTools(app)) || `当前环境 ${process.env.NODE_ENV}`);
const options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: 3600 * 24 * 7 * 1000,
  redirect: false,
};
app.use(express.static(path.resolve(__dirname, '../public'), options));
app.use('/', main);
/* eslint-disable */
app.use((err, req, res, next) => {
  res.json({
    message: '404',
    err,
  });
});
export default app;
