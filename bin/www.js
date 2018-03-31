/**
 * Created by ink on 2018/3/31.
 */
import app from '../server/index'
import http from 'http'
const server = http.createServer(app)
server.listen('8888', () => {
  console.log('启动成功，监听端口：8888')
})