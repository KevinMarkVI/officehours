var app = require('./app');
var studentName = process.argv[2];

console.log(app.timeToMinutes('0112'));

console.log(app.verifyTimes('1350', '1419'));