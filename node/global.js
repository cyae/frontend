const cycleDependency = require('./import & export');
// In a broswer, the global variable is 'window'
// var W = window.width;
// var H = window.height;

// while in node, the global variable is 'global'
const interval = global.setInterval(() => {
    console.log('hello');
}, 1000);

global.setTimeout(() => {
    console.log('hi');
    clearInterval(interval);
}, 3000);

// path printer
console.log(__dirname);
console.log(__filename);

// cycle detected, will print undefined
// console.log(cycleDependency.a);

var exported = [123, 345];
module.exports = interval;
module.exports = {
    interval, exported
}
