const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const config = require('../../webpack/webpack.config.dev.babel');

const compiler = webpack(config);

require('babel-register')({
  plugins: [
    [
      'babel-plugin-transform-require-ignore',
      {
        extensions: ['.less'],
      },
    ],
    'dynamic-import-node',
  ],
});

const injectDevelopmentTools = (app) => {
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 2000,
  }));
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: true,
    headers: {
      'Cache-Control': 'max-age=36000',
    },
  }));
  return '本地开发链接webpack与node服务';
};
module.exports = {
  env: 'development',
  port: '8888',
  ip: '0.0.0.0',
  injectDevelopmentTools,
};
