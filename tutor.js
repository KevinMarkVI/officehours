

if (process.argv.length < 5) {
  return console.log("Oops! You forgot to enter a tutor in the format 'node tutor.js Tutor_Name Start_Time End_Time'");
}

var tutorName = process.argv[2];
if (tutorName.length < 3 || tutorName.length > 20) {
  return console.log("Invalid Name Length. Names must be greater than 3 characters, but less than 21");
}

var startTime = process.argv[3];

var endTime = process.argv[4];


var convertTime = function(militaryTime) {
  var hours = militaryTime.slice(0,2);
  var minutes = militaryTime.slice(2);
  if (hours > 11) {
    hours -= 12;
    return '' + hours + ':' + minutes +'pm';
  } else {
    if (hours == "00") {
      hours = 12;
    }
    if (hours[0] === '0') {
      hours = hours[1];
    }
    return '' + hours + ':' + minutes +'am';
  }
};



//put the variables in the database

//return the statement Added tutorName available 10:00am to 3:00pm