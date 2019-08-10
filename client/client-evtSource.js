/**
 * 如需支持发送cookie，请设置响应头Access-Control-Allow-Origin': req.headers.origin 和 Access-Control-Allow-Credentials:true，
 * 并且创建evtSource对象时，需要明确指定是否发送凭证。
 */
// var evtSource = new EventSource('/message', {
//     withCredentials: true
// }); // 创建时指定配置才是有效的
// evtSource.withCredentials = true; // 与ajax不同，这样设置是无效的

var evtSource = new EventSource('/msg');

/**
 * 连接接打开时的回调
 */
evtSource.onopen = function (e) {

    // open时readyState===1
    console.log('当前状态readyState:', evtSource.readyState);
}

/**
 * 出错时的回调(网络问题,或者服务下线等都有可能导致出错)
 */
evtSource.onerror = function (e) {

    // 出错时readyState===0
    console.log(evtSource.readyState);
    // 出错时，chrome浏览器会每隔3秒向服务器重发原请求,直到成功. 因此出错时，可主动断开原连接.
    evtSource.close();
}

/**
 * 默认监听事件
 * nginx 配置 proxy_buffering off; 打开，意味着积攒到一定数据大小再发送
 * nginx默认开启的buffer机制缓存了服务器推送的片段信息，缓存达到一定的量才会返回响应内容
 */
// evtSource.onmessage = function (e) {

//     console.log(`接收服务端消息... ${e.data}`); // 打印服务器推送的信息
// };

/**
 * 事件类型可以随你定义
 */
evtSource.addEventListener("EVEN", function (e) {

    console.log('偶数事件类型:', e.data);
}, false);

evtSource.addEventListener("ODD", function (e) {

    console.log('奇数事件类型:', e.data);
}, false);
