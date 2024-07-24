console.log("1 . Start");

const child_process = require('child_process');
const newProcess = child_process.spawn('node', ['fibonacci'], {
    stdio: 'inherit'
});

console.log("3 . End");