var app = require('./app');

var tutorName = process.argv[2];
var tutorInfo = JSON.parse(localStorage.getItem(tutorName));
var tutorSchedule = tutorInfo[1];

app.logSchedule(tutorSchedule);