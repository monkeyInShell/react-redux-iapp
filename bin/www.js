/**
 * Created by ink on 2018/3/31.
 */
if (process.env.NODE_ENV === 'local') {
  require('babel-register')({
    'plugins': [
      [
        'babel-plugin-transform-require-ignore',
        {
          extensions: ['.less']
        }
      ]
    ]
  })
}
const app = require('../server/index').default
const http = require('http')
const server = http.createServer(app)
server.listen('8888', () => {
  console.log('启动成功，监听端口：8888')
})
