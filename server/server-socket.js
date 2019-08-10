var WebSocketServer = require('ws').Server,
    server = new WebSocketServer({ port: 10103 });

server.on('connection', function (s) {
    s.on('message', function (msg) { //监听客户端消息
        console.log('client say: %s', msg);
    });
    s.send('server ready!');// 连接建立好后，向客户端发送一条消息
});