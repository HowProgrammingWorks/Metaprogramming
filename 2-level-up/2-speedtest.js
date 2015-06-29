var duration1 = function(s) {
  var result = 0;
  if (typeof(s) === 'string') {
    var days    = s.match(/(\d+)\s*d/),
        hours   = s.match(/(\d+)\s*h/),
        minutes = s.match(/(\d+)\s*m/),
        seconds = s.match(/(\d+)\s*s/);
    if (days)    result += parseInt(days[1])*86400;
    if (hours)   result += parseInt(hours[1])*3600;
    if (minutes) result += parseInt(minutes[1])*60;
    if (seconds) result += parseInt(seconds[1]);
    result = result*1000;
  } if (typeof(s) === 'number') result = s;
  return result;
};

var duration2 = function(s) {
  var result = 0;
  if (typeof(s) === 'string') {
    var days    = s.match(/(\d+)\s*d/),
        hours   = s.match(/(\d+)\s*h/),
        minutes = s.match(/(\d+)\s*m/),
        seconds = s.match(/(\d+)\s*s/);
    if (days)    result += parseInt(days[1])*86400;
    if (hours)   result += parseInt(hours[1])*3600;
    if (minutes) result += parseInt(minutes[1])*60;
    if (seconds) result += parseInt(seconds[1]);
    result = result * 1000;
  } if (typeof(s) === 'number') result = s;
  return result;
};

for (k = 0; k < 9; ++k) {

  var start = new Date().getTime();
  for (i = 0; i < 1000000; ++i) {
    duration2('1d 10h 7m 13s');
  }
  var end = new Date().getTime();
  var time = end - start;
  console.log('duration1 Execution time (1mln): ' + time);

  var start = new Date().getTime();
  for (i = 0; i < 1000000; ++i) {
    duration2('1d 10h 7m 13s');
  }
  var end = new Date().getTime();
  var time = end - start;
  console.log('duration2 Execution time (1mln): ' + time);

}
