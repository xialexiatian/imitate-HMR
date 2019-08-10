// const { fork } = require('child_process');
// const cpuNum = require('os').cpus();

// for (let i = 0; i < cpuNum.length; i++) {
//     fork('./node/worker.js');
// }

const { fork } = require('child_process')
const server = require('net').createServer()

server.listen(8888, () => {
    console.log('master on :', 8888)
})

const workers = {}

for (const i = 0; i < 2; i++) {
    const worker = fork('./node/worker.js')
    worker.send('server', server)
    worker[worker.pid] = worker
}