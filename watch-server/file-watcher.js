const fs = require('fs');
const md5 = require('md5');
require("log-timestamp");
var exec = require('child_process').exec;

// 监听文件变化后，执行 回调操作逻辑，可直接编写 命令
var cmd = 'tsc ../../ts/ts.ts';

// 读取 被修改文件
const monitoring = '../views/monitoring.js';
console.log(`监听文件变化.... ${monitoring}`);

// fs.watchFile(monitoring, (curr, prev) => {
//     console.log(`${monitoring.js} file change`);
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
//         const md5Current = md5(fs.readFileSync(monitoring.js));
//         if (md5Current === md5Previous) {
//             return;
//         }
//         md5Previous = md5Current;
//         console.log(`${filename} file change`);
//     }
// })

let fsWait = false;
fs.watch(monitoring, (event, filename) => {
    if (filename) {
        if (fsWait) return;
        fsWait = setTimeout(() => {
            fsWait = false;
        }, 100);
        exec(cmd, function (error, stdout, stderr) {
            /**
             * 监听文件变化后，执行 回调操作逻辑
             * 读取被改动文件内容，压缩，输入到 build 文件夹下
             */
            console.log('监听文件变化后，执行 回调操作逻辑...', stdout);
        });
        console.log(`${filename} file Changed`);
    }
});