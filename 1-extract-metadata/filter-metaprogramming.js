// Data
//
var names = [
	"Marcus Aurelius Antoninus Augustus",
	"Darth Vader",
	"Victor Michailovich Glushkov",
	"Gottfried Wilhelm von Leibniz",
	"Mao Zedong",
	"Vladimir Sergeevich Soloviov",
	"Ibn Arabi",
	"Lev Nikolayevich Tolstoy",
	"Muammar Muhammad Abu Minyar al-Gaddafi",
	"Rene Descartes",
	"Fyodor Mikhailovich Dostoyevsky",
	"Benedito de Espinosa"
];

// Metadata
//
var conditions = {
	length: [10, 200],
	contains: "Mich",
	starts: "V",
	ends: "ov",
	not: {
		length: [50, 65],
		contains: "Abu",
		starts: "Lev",
		ends: "iov"
	}
};

// Metamodel
//
function filter(names, conditions) {
	var operations = {
		length:   function(s,v) { return s.length>=v[0] && s.length<=v[1] },
		contains: function(s,v) { return s.indexOf(v) > -1 },
		starts:   function(s,v) { return s.indexOf(v) === 0 },
		ends:     function(s,v) { return s.slice(-v.length) == v },
		not:      function(s,v) { return !check(s,v) }
	};
	function check(s, conditions) {
		var valid = true;
		for (var key in conditions) valid &= operations[key](s, conditions[key]);
		return valid;
	}
	return names.filter(function(s) { return check(s, conditions); });
}

// Execution
//
console.dir(filter(names, conditions));
