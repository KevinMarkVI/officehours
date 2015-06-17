var app = require('./app');
var studentName = process.argv[2];

var studentSchedule = JSON.parse(localStorage.getItem(studentName));

app.logSchedule(studentSchedule);


