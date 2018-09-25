'use strict';

const fs = require('fs');
const request = require('request');

// Utilities

const DURATION_UNITS = {
  d: 86400, // days
  h:  3600, // hours
  m:    60, // minutes
  s:     1, // seconds
};

// Parse duration to seconds
//   s - string, duration syntax
// Returns: number, milliseconds
// Example: duration('1d 10h 7m 13s')
const duration = s => {
  if (typeof s === 'number') return s;
  if (typeof s !== 'string') return 0;
  let result = 0;
  const parts = s.split(' ');
  for (const part of parts) {
    const unit = part.slice(-1);
    const value = parseInt(part.slice(0, -1));
    const mult = DURATION_UNITS[unit];
    if (!isNaN(value)) result += value * mult;
  }
  return result * 1000;
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
    save: 'file3.json' },
];

// Metaprogramming

const iterate = tasks => {

  // Configuration metadata
  const sources = {
    get:  request.get,
    load: fs.createReadStream
  };
  const destinations = {
    save: fs.createWriteStream,
    post: request.post,
    put:  request.put
  };

  // Abcstract logic
  const closureTask = task => () => {
    console.dir(task);
    let source;
    for (const key in sources) {
      const value = task[key];
      if (value) source = sources[key](value);
    }
    for (const key in destinations) {
      const value = task[key];
      if (value) {
        const dest = destinations[key](value);
        source.pipe(dest);
      }
    }
  };

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const interval = duration(task.interval);
    setInterval(closureTask(task), interval);
  }
};

// Usage

iterate(tasks);
