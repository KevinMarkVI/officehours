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

  logSchedule: function(schedule) {
    for (var i = 0; i < schedule.length; i++) {
      for (var key in schedule[i]) {
        console.log('' + module.exports.convertTime(schedule[i][key][0]) + ' to ' + module.exports.convertTime(schedule[i][key][1]) + ' with ' + key + '');
      }
    } 
  },

  reserveConflict: function(tutorTime, tutorName, tutorSchedule, start, end) {
    console.log("TUTORTIME: ", tutorTime);
    start = module.exports.timeToMinutes(start);
    end = module.exports.timeToMinutes(end);
    if (start <= tutorTime[0][0] || end >= tutorTime[0][1]) {
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
      if (start >= studentTimes[j][0] && start < studentTimes[j][1]) {
        console.log(''+ tutorName + ' already has a student during that time');
        return false;
      }
    }
    return true;
  },

  reserve: function(studentName, tutorName, start, end) {
    var tutorInfo = JSON.parse(localStorage.getItem(tutorName));
    var tutorTime = tutorInfo[0];
    var tutorSchedule = tutorInfo[1];
    var studentSchedule = JSON.parse(localStorage.getItem(studentName));

    if (module.exports.verifyTimes(start, end) && module.exports.reserveConflict(tutorTime, tutorName, tutorSchedule, start, end)) {
      console.log('Scheduled ' + studentName + ' with ' + tutorName + ' from ' + module.exports.convertTime(start) + ' to ' + module.exports.convertTime(end)+ '');
      if (localStorage.getItem(studentName)) {
        var studentObj = {};
        studentObj[tutorName] = [start, end];
        studentSchedule.push(studentObj);
        localStorage.setItem(studentName, JSON.stringify(studentSchedule));

        var tutorObj ={};
        tutorObj[studentName] = [module.exports.timeToMinutes(start), module.exports.timeToMinutes(end)];
        tutorInfo[1].push(tutorObj);
        localStorage.setItem(tutorName, JSON.stringify(tutorInfo));

      } else {
        var newObj = {};
        newObj[tutorName] = [start, end];
        localStorage.setItem(studentName, JSON.stringify([newObj]));
      }
    }
  },

};


