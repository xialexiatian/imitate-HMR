const http = require('http');
const fs = require('fs');

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
         * 默认事件 热更新方式：
         * 1、执行定时一秒操作
         * 2、推送 文件 后缀名hash值
         */

        // === 1、执行定时一秒操作
        // let seconds = 0;
        // setInterval(() => {
        //     seconds++;
        //     console.log(`执行定时一秒操作...${seconds}\n`);
        //     res.write(`data: ${new Date()} \n\n`); // 发送 data 具体数据值 必须要以 \n\n 换行结尾，否则会认为消息未写完,成 pending 状态
        // }, 1000);// 默认情况下，服务器每一秒推送一条信息到浏览器

        // === 2、判断 文件 后缀名hash值
        setInterval(() => {
            // 读取第三方文件内容 hash值
            fs.readFile('../globalHash.js', 'utf8', (err, data) => { // 读取文件

                if (err) {
                    console.log('读取文件.......fail');
                } else { // 推送文件后缀名hash值

                    console.log('推送文件后缀名hash值到客户端...', data);
                    res.write(`data: ${data} \n\n`);
                }
            });
        }, 1000);

        /**
         * 自定义类型事件
         */
        // let flag = false;
        // setInterval(() => {

        //     if (flag) {

        //         console.log('偶数类型事件...', flag);
        //         res.write('event: EVEN\n'); // 定义事件名
        //         res.write('data: 这是一个自定义的偶数类型事件\n\n'); // 发送 data 具体数据值 必须要以 \n\n 换行结尾，否则会认为消息未写完,成 pending 状态

        //         flag = false;
        //     } else {

        //         console.log('奇数类型事件...', flag);
        //         res.write('event: ODD\n');
        //         res.write('data: 这是一个自定义的奇数类型事件\n\n');

        //         flag = true;
        //     }
        // }, 1000);// 默认情况下，服务器每一秒推送一条信息到浏览器

    }

    /**
     * 可根据自身需求请求额外接口数据
     */
}).listen(9999, () => {
    console.log('Listening on 9999');
});