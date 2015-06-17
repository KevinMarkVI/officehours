var app = require('./app');

if (process.argv.length != 3) {
  return console.log("Oops! You forgot to enter a tutor in the format 'node student.js Student_Name'");
}

var studentName = process.argv[2];

if (app.verifyName(studentName)) {
  var studentSchedule = JSON.parse(localStorage.getItem(studentName));
  app.logSchedule(studentSchedule);
}


