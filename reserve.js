var app = require('./app');

if (process.argv.length < 5) {
  return console.log("Oops! You forgot to enter a tutor in the format 'node reserve.js Student_Name Tutor_Name Start_Time End_Time'");
}

var studentName = process.argv[2];
var tutorName = process.argv[3];
var startTime = process.argv[4];
var endTime = process.argv[5];


app.reserve(studentName, tutorName, startTime, endTime);