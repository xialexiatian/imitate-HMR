/**
 * 利用第三方库
 * 也可自行查阅官方文档，自行实现 socket
 */
var WebSocketServer = require('ws').Server,
    server = new WebSocketServer({ port: 10103 });

server.on('connection', function (s) {
    s.on('message', function (msg) { //监听客户端消息
        console.log('client say: %s', msg);
    });
    s.send('server ready!');// 连接建立好后，向客户端发送一条消息
});