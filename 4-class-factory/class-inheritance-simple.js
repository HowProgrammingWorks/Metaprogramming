// Base class
//
var Ground = function(area) {
	this.area = area;
};

// Base class prototype method
//
Ground.prototype.calculateCost = function(price) {
	return this.area * price;
}

// Create descendant class
//
var LandOwnership = function(area) {
	this.area = area;
	this.category = "land";
	this.type = "ownership";
};

// Use protorype inheritance from Ground
//
LandOwnership.prototype = Object.create(Ground.prototype);

// Create and use instance
//
var land = new LandOwnership(50);
console.dir(land);
console.log('Cost is: '+land.calculateCost(7));
