var app = require('./app');

var tutorName = process.argv[2];
var startTime = process.argv[3];
var endTime = process.argv[4];

if (process.argv.length < 5) {
  return console.log("Oops! You forgot to enter a tutor in the format 'node tutor.js Tutor_Name Start_Time End_Time'");
}


//put the variables in the database

//return the statement Added tutorName available 10:00am to 3:00pm

