'use strict';

const fs = require('fs');
const http = require('http');

// Parse duration to seconds
// Example: duration('1d 10h 7m 13s')

const duration = s => {
  if (typeof s === 'number') return s;
  let result = 0;
  if (typeof s === 'string') {
    const days    = s.match(/(\d+)\s*d/);
    const hours   = s.match(/(\d+)\s*h/);
    const minutes = s.match(/(\d+)\s*m/);
    const seconds = s.match(/(\d+)\s*s/);
    if (days)    result += parseInt(days[1]) * 86400;
    if (hours)   result += parseInt(hours[1]) * 3600;
    if (minutes) result += parseInt(minutes[1]) * 60;
    if (seconds) result += parseInt(seconds[1]);
    return result * 1000;
  }
};

// Metadata

const tasks = [
  { interval: 5000,
    get: 'http://127.0.0.1/api/method1.json',
    save: 'file1.json' },
  { interval: '8s',
    get: 'http://127.0.0.1/api/method2.json',
    put: 'http://127.0.0.1/api/method4.json',
    save: 'file2.json' },
  { interval: '7s',
    get: 'http://127.0.0.1/api/method3.json',
    post: 'http://127.0.0.1/api/method5.json' },
  { interval: '4s',
    load: 'file1.json',
    put: 'http://127.0.0.1/api/method6.json' },
  { interval: '9s',
    load: 'file2.json',
    post: 'http://127.0.0.1/api/method7.json',
    save: 'file1.json' },
  { interval: '3s',
    load: 'file1.json',
    save: 'file3.json' }
];

// Metaprogram

const iterate = tasks => {
  const closureTask = task => () => {
    console.dir(task);
    let source;
    if (task.get)  source = http.get(task.get);
    if (task.load) source = fs.createReadStream(task.load);
    if (task.save) source.pipe(fs.createWriteStream(task.save));
    if (task.post) source.pipe(http.post(task.post));
    if (task.put)  source.pipe(http.put(task.put));
  };
  for (let i = 0; i < tasks.length; i++) {
    setInterval(closureTask(tasks[i]), duration(tasks[i].interval));
  }
};

// Usage

iterate(tasks);
