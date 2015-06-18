var app = require('./app');

if (process.argv.length != 5) {
  return console.log("Oops! You forgot to enter a tutor in the format 'node tutor.js Tutor_Name Start_Time End_Time'");
}

var tutorName = process.argv[2];
var startTime = process.argv[3];
var endTime = process.argv[4];

if (app.verifyName(tutorName)) {
  app.addTutor(tutorName, startTime, endTime);
}
