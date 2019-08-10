const fs = require('fs');
const md5 = require('md5');
require("log-timestamp");
const exec = require('child_process').exec;

/**
 * 直接编写 命令行
 * tsConvertJs ts 转 js
 * copyFile 拷贝文件
 */
const tsConvertJs = 'tsc ./ts/ts.ts';
const copyFile = 'cp ../views/monitoring.js ../build';

/**
 * 读取 被修改文件
 */
const monitoring = '../views/monitoring.js';
console.log(`所监听文件....... ${monitoring}\n`);

// fs.watchFile(monitoring, (curr, prev) => {
//     console.log(`${monitoring} file change`);
// });
// fs.watch(monitoring.js, (event, filename) => {
//     if (filename && event === 'change') {
//         console.log(`${filename} file change`);
//     }
// });

// let previousMTime = new Date(0);
// fs.watch(monitoring, (event, filename) => {
//     if (filename) {
//         const stas = fs.statSync(filename);
//         if (stas.mtime.valueOf() === previousMTime.valueOf()) {
//             return;
//         }
//         previousMTime = stas.mtime;
//         console.log(`${filename} file change`);
//     }
// })

// let md5Previous = null;
// fs.watch(monitoring, (event, filename) => {
//     if (filename) {
//         const md5Current = md5(fs.readFileSync(monitoring));
//         if (md5Current === md5Previous) {
//             return;
//         }
//         md5Previous = md5Current;
//         console.log(`${filename} file change`);
//     }
// })

/**
 * 监听 单个 ../views/monitoring.js 文件修改
 * 可查阅官方 API 如何批量监听文件修改
 */
let fsWait = false;
fs.watch(monitoring, (event, filename) => {

    if (filename) {

        /**
         * 定时 100毫秒 监测
         * 延时会导致文件读取 或  写入内容为空
         * 若不延时，会导致短期多次插入，此处采取 100 毫秒延时处理，有兴趣者，可进行优化
         */
        if (fsWait) return;
        fsWait = setTimeout(() => {
            fsWait = false;
        }, 100);

        /**
         * 对 文件进行 读取 写入，会存在操作 延时
         * 监听文件变化后，执行 回调操作逻辑
         * 压缩 更改文件 (此处并未处理压缩，可查阅相关资料自行实现)
         * 打上 hash 后缀 (此处只是读取文件内容，添加 hash 为文件后缀名，有多种实现方式，可查阅相关资料自行实现)
         * 输出到 build 文件夹下
         */
        fs.readFile(monitoring, 'utf8', (err, data) => { // 读取文件

            if (err) {
                console.log('读取文件.......fail');
            } else { // 写入文件

                console.log('打印文件内容.......', data);
                // 利用修改文件时间戳，代替hash (上方注释代码也有各种实现方式，可自行研究官方文档)
                let timestamp = +new Date();
                fs.writeFile(`../build/monitoring.${timestamp}.js`, data.toString(), 'utf8', (err, data) => {
                    if (err) {
                        console.log('写入文件.......fail');
                    } else {
                        console.log('写入文件.......success');

                        // 此处 利用第三方文件内容进行值共享，(有各种实现方式，可自行研究官方文档)
                        fs.writeFile(`../globalHash.js`, timestamp, 'utf8', (err, data) => {
                            if (err) {
                                console.log('写入hash.......fail');
                            } else {
                                console.log('写入hash.......success');
                            }
                        });
                    }
                });
            }
        });



        /**
         * 执行命令行方式，回调监听
         */
        // exec(copyFile, function (error, stdout, stderr) {

        //     if (error) {
        //         console.log('copyFile，error.......\n', error);

        //     } else {
        //         console.log('copyFile，success.......\n', stdout);

        //     }

        // });
        // exec(tsConvertJs, function (error, stdout, stderr) {

        //     if (error) {
        //         console.log('tsConvertJs，执行错误.......\n', error);

        //     } else {
        //         console.log('tsConvertJs，success.......\n', stdout);

        //     }

        // });
        //
        console.log(`${filename} file Changed\n`);
    }
});