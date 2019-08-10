const http = require('http');

http.createServer((req, res) => {

    /**
     * client-server 端到端实时连接
     */
    if (req.url === '/msg') {
        /**
         * 为了避免缓存，Cache-Control 特别设置成了 no-cache，
         * 为了能够发送多个response， Connection被设置成了keep-alive.。
         * 发送数据时，请务必保证服务器推送的数据以 data:开始，以\n\n结束，否则推送将会失败(这是规则约定的)
         */
        res.writeHead(200, {
            'content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        /**
         * 默认事件
         */
        // setInterval(() => {
        // 默认情况下，服务器每十秒推送一条信息到浏览器
        //     res.write(`data: ${new Date()} \n\n`);
        // }, 10000);



        /**
         * 自定义类型事件
         */
        setInterval(() => {
            // 默认情况下，服务器每十秒推送一条信息到浏览器
            res.write('event: APPLE\n');
            res.write('data: 这是一个自定义的APPLE类型事件\n');
            res.write('data: 多个data字段将被解析成一个字段\n\n');
        }, 10000);

    }

    /**
     * 可根据自身需求请求额外接口数据
     */

}).listen(9999, () => {
    console.log('Listening on 9999');
});