var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('office-hours.db');

module.exports = {

  convertTime: function(militaryTime) {
    var hours = militaryTime.slice(0,2);
    var minutes = militaryTime.slice(2);
    if (hours > 11) {
      if (hours === '12') {
        return '' + hours + ':' + minutes +'pm';
      } else {
        hours -= 12;
      return '' + hours + ':' + minutes +'pm';
      }
    } else {
      if (hours == "00") {
        hours = 12;
      }
      if (hours[0] === '0') {
        hours = hours[1];
      }
    return '' + hours + ':' + minutes +'am';
    }
  },

  verifyName: function(name) {
    if (name.length < 3 || name.length > 20) {
      console.log("Invalid Name Length. Names must be greater than 3 characters, but less than 21");
      return false;
    } else {
      return true;
    }
  },

  verifyTimes: function(start, end) {
    var startMinutes = start.slice(2);
    var endMinutes = end.slice(2);
    var startHour = start.slice(0,2);
    var endHour = end.slice(0,2);
    var endToMinutes = parseInt(endHour) * 60 + parseInt(endMinutes);
    var startToMinutes = parseInt(startHour) * 60 + parseInt(startMinutes);
    var sessionLength = endToMinutes - startToMinutes;
    
    if (startToMinutes > endToMinutes) {
      console.log("Oops! Starting time must be before ending time!");
      return false;
    }
    if (sessionLength < 30) {
      console.log("Sessions must be at least 30 minutes");
      return false;
    }
    return true;
  }
};



// var check;
// db.serialize(function() {

//   db.run("CREATE TABLE if not exists user_info (info TEXT)");
//   var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

// db.close();

/*
//Load modules
var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('./database_name.db');

//Perform SELECT Operation
db.all("SELECT * from blah blah blah where this="+that,function(err,rows){
//rows contain values while errors, well you can figure out.
});

//Perform INSERT operation.
db.run("INSERT into table_name(col1,col2,col3) VALUES (val1,val2,val3)");

//Perform DELETE operation
db.run("DELETE * from table_name where condition");

//Perform UPDATE operation
db.run("UPDATE table_name where condition");

*/


