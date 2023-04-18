const dependencies = require('./global'); // import all from module.exports in global.js
const { interval } = require('./global'); // only import 'interval'

var a = dependencies.exported;

console.log(a);

module.exports = { a };

console.log(interval);
