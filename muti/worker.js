const http = require('http');
const port = Math.round(1 + Math.random() * 10000);

http.createServer((req, res) => {
    res.end('balabala');
}).listen(port, '127.0.0.1', () => {
    console.log(`我是pid: ${process.pid}, 我监听：${port}`);
})