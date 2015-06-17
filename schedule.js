var app = require('./app');

if (process.argv.length != 3) {
  return console.log("Oops! You forgot to enter in the format 'node schedule.js Tutor_Name'");
}

var tutorName = process.argv[2];
var tutorInfo = JSON.parse(localStorage.getItem(tutorName));
var tutorSchedule = tutorInfo[1];

app.logSchedule(tutorSchedule);