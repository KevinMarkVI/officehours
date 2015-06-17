var app = require('./app');

if (process.argv.length != 5) {
  return console.log("Oops! You forgot to enter a tutor in the format 'node tutor.js Tutor_Name Start_Time End_Time'");
}

var tutorName = process.argv[2];
var startTime = process.argv[3];
var endTime = process.argv[4];


if (app.verifyName(tutorName)) {
  var start = app.timeToMinutes(startTime);
  var end = app.timeToMinutes(endTime);
  localStorage.setItem(tutorName, JSON.stringify([[start, end], []]));
  console.log('Added tutor ' + tutorName + ' available ' + app.convertTime(startTime) +' to ' + app.convertTime(endTime) +'.');
}
