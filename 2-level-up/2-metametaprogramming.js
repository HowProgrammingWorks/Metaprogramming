var fs = require('fs'),
	request = require('request');

// Parse duration to seconds
// Example: duration("1d 10h 7m 13s")
//
function duration(s) {
	if (typeof(s) == 'number') return s;
	var units = {
		days:    { rx:/(\d+)\s*d/, mul:86400 },
		hours:   { rx:/(\d+)\s*h/, mul:3600 },
		minutes: { rx:/(\d+)\s*m/, mul:60 },
		seconds: { rx:/(\d+)\s*s/, mul:1 }
	};
	var result = 0, unit, match;
	if (typeof(s) == 'string') for (var key in units) {
		unit = units[key];
		match = s.match(unit.rx);
		if (match) result += parseInt(match[1])*unit.mul;
	}
	return result*1000;
}

// Metadata
//
var tasks = [
	{ interval:5000, get:"http://127.0.0.1/api/method1.json", expect:"OK", save:"file1.json" },
	{ interval:"8s", get:"http://127.0.0.1/api/method2.json", put:"http://127.0.0.1/api/method4.json", save:"file2.json" },
	{ interval:"7s", get:"http://127.0.0.1/api/method3.json", expect:"Done", post:"http://127.0.0.1/api/method5.json" },
	{ interval:"4s", load:"file1.json", expect:"OK", put:"http://127.0.0.1/api/method6.json" },
	{ interval:"9s", load:"file2.json", post:"http://127.0.0.1/api/method7.json", save:"file1.json" },
	{ interval:"3s", load:"file1.json", save:"file3.json" },
];

// Metamodel
//
function iterate(tasks) {

	// Metamodel configuration metadata
	//
	var sources = {
		get:  request.get,
		load: fs.createReadStream
	};
	var destinations = {
		save: fs.createWriteStream,
		post: request.post,
		put:  request.put
	};

	// Metamodel logic
	//
	function closureTask(task) {
		return function () {
			console.dir(task);
			var verb, source, destination;
			for (key in sources) if (task[key]) source = sources[key](task[key]);
			for (key in destinations) if (task[key]) source.pipe(destinations[key](task[key]));
		}
	}
	for (var i=0; i<tasks.length; i++) setInterval(closureTask(tasks[i]), duration(tasks[i].interval));
}

// Execution
//
iterate(tasks);
