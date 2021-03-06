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
    }
    if (!(/^[a-zA-Z0-9-_]+$/.test(name))) {
      console.log("Names may only contain lowercase and uppercase leters, numbers, dashes, or underscores");
      return false;
    }
    return true;
  },

  timeToMinutes: function(time) {
    if (typeof time === 'number') {
      time = time.toString();
    }
    var minutes = time.slice(2);
    var hours = time.slice(0,2);
    var result = parseInt(hours) * 60 + parseInt(minutes);
    return result;
  },

  verifyTimes: function(start, end) {
    if (start.length + end.length !== 8) {
      console.log("Oops! make sure you have entered the times correctly! Ex. '0000' for '12:00AM'");
      return false;
    }

    start = module.exports.timeToMinutes(start);
    end = module.exports.timeToMinutes(end);
    var sessionLength = end - start;

    if (start > 1439 || end > 1439) {
      console.log("Oops! make sure you have entered the times correctly! Ex. '0000' for '12:00AM'");
      return false;
    }
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

  addTutor: function(tutorName, startTime, endTime) {
    var start = module.exports.timeToMinutes(startTime);
    var end = module.exports.timeToMinutes(endTime);
    localStorage.setItem(tutorName, JSON.stringify([[start, end], []]));
    console.log('Added tutor ' + tutorName + ' available ' + module.exports.convertTime(startTime) +' to ' + module.exports.convertTime(endTime) +'.');
  },

  logSchedule: function(schedule) {
    for (var i = schedule.length -1; i >= 0; i--) {
      for (var key in schedule[i]) {
        console.log('' + module.exports.convertTime(schedule[i][key][0]) + ' to ' + module.exports.convertTime(schedule[i][key][1]) + ' with ' + key + '');
      }
    } 
  },

  timeAvailable: function(tutorTime, tutorName, tutorSchedule, start, end) {
    start = module.exports.timeToMinutes(start);
    end = module.exports.timeToMinutes(end);

    if (start < tutorTime[0]) {
      console.log('' + tutorName + ' is not available at the requested time.');
      return false;
    }
    if (end > tutorTime[1]) {
      console.log('' + tutorName + ' is not available at the requested time.');
      return false;
    }

    var studentTimes = [];
    for (var i = 0; i < tutorSchedule.length; i++) {
      for (var key in tutorSchedule[i]) {
        studentTimes.push(tutorSchedule[i][key]);
      }
    }
    
    for (var j = 0; j < studentTimes.length; j++) {
      if (start <= module.exports.timeToMinutes(studentTimes[j][0]) && end > module.exports.timeToMinutes(studentTimes[j][0])) {
        console.log(''+ tutorName + ' already has a student during that time');
        return false;
      }
      if (start >= module.exports.timeToMinutes(studentTimes[j][0]) && end <= module.exports.timeToMinutes(studentTimes[j][1])) {
        console.log(''+ tutorName + ' already has a student during that time');
        return false;
      }
      if (start < module.exports.timeToMinutes(studentTimes[j][1]) && end >= module.exports.timeToMinutes(studentTimes[j][1])) {
        console.log(''+ tutorName + ' already has a student during that time');
        return false;
      }
    }
    return true;
  },

  reserveTime: function(studentName, tutorName, start, end) {
    var tutorInfo = JSON.parse(localStorage.getItem(tutorName));
    var tutorTime = tutorInfo[0];
    var tutorSchedule = tutorInfo[1];
    var studentSchedule = JSON.parse(localStorage.getItem(studentName));

    if (module.exports.verifyTimes(start, end) && module.exports.timeAvailable(tutorTime, tutorName, tutorSchedule, start, end)) {
      console.log('Scheduled ' + studentName + ' with ' + tutorName + ' from ' + module.exports.convertTime(start) + ' to ' + module.exports.convertTime(end)+ '');
      
      if (localStorage.getItem(studentName)) {
        var studentObj = {};
        studentObj[tutorName] = [start, end];
        studentSchedule.push(studentObj);
        localStorage.setItem(studentName, JSON.stringify(studentSchedule));

      } else {
        var newStudentObj = {};
        newStudentObj[tutorName] = [start, end];
        localStorage.setItem(studentName, JSON.stringify([newStudentObj]));
      }

      var tutorObj ={};
      tutorObj[studentName] = [start, end];
      tutorInfo[1].push(tutorObj);
      localStorage.setItem(tutorName, JSON.stringify(tutorInfo));
    }
  },
};


