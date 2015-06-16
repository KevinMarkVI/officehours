if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

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

  timeToMinutes: function(time) {
    var minutes = time.slice(2);
    var hours = time.slice(0,2);
    var result = parseInt(hours) * 60 + parseInt(minutes);
    return result;
  },

  verifyTimes: function(start, end) {
    start = module.exports.timeToMinutes(start);
    end = module.exports.timeToMinutes(end);
    var sessionLength = end - start;
    
    if (start > end) {
      console.log("Oops! Starting time must be before ending time!");
      return false;
    }
    if (sessionLength < 30) {
      console.log("Oops! Session must be at least 30 minutes!");
      return false;
    }
    return true;
  },

  reserveConflict: function(tutorTime, start, end) {
    // start = module.exports.timeToMinutes(start);
    // end = module.exports.timeToMinutes(end);
    // for (var i = 0; i < tutorTime.length; i++) {
    //   if (tutorTime[i][0] >= start && tutorTime[i][1] <= end) {

    //   }
    // }
    return true;
  },

  reserve: function(studentName, tutorName, start, end) {
    console.log("PARSED: ", typeof localStorage.getItem(tutorName));
    var tutorTimes = JSON.parse(localStorage.getItem(tutorName));
    console.log("TUTOR TIMES: ", tutorTimes);

    if (module.exports.verifyTimes(start, end) && module.exports.reserveConflict(tutorTimes, start, end)) {
      console.log('Scheduled ' + studentName + ' with ' + tutorName + ' from ' + module.exports.convertTime(start) + ' to ' + module.exports.convertTime(end)+ '');

      if (localStorage.getItem(studentName)) {
        console.log("IN HERE");
        var studentSchedule = JSON.parse(localStorage.getItem(studentName));

        if (studentSchedule[tutorName]) {
          console.log("IN HERE 2");
          studentSchedule[tutorName].push([start, end]);
          localStorage.setItem(studentName, JSON.stringify(studentSchedule));
        } else {
          studentSchedule[tutorName] = [[start, end]];
          localStorage.setItem(studentName, JSON.stringify(studentSchedule));
        }
      } else {
        console.log("SHOULD SEE ME");
        var obj = {};
        obj[tutorName] = [[start, end]];
        localStorage.setItem(studentName, JSON.stringify(obj));
      }
    } else {
      return false;
    }
    return true;
  },
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


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
 
localStorage.setItem('myFirstKey', 'myFirstValue');
console.log(localStorage.getItem('myFirstKey'));




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


