/**
 * Created by ink on 2018/3/31.
 */
if (process.env.NODE_ENV === 'local') {
  //node运行时生效,同样也会去读.babelrc，plugins不会覆盖，会concat生效
  //webpack生效的配置是.babelrc
  require('babel-register')({
    'plugins': [
      [
        'babel-plugin-transform-require-ignore',
        {
          extensions: ['.less']
        }
      ],
      'dynamic-import-node'
    ]
  })
}
const app = require('../server/index').default
const http = require('http')
const server = http.createServer(app)
server.listen('8888', () => {
  console.log('启动成功，监听端口：8888')
})
