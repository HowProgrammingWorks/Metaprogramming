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
	this.constructor.apply(this, arguments);
	this.isEmpty = !(parseInt(area) > 0);
};

// Use protorype inheritance from Ground
//
LandOwnership.prototype = Object.create(Ground.prototype);

// Add properties to descendant class prototype
//
LandOwnership.prototype.category = "land";
LandOwnership.prototype.type = "ownership";

// Add method to descendant class prototype
//
LandOwnership.prototype.toString = function(price) {
	return this.category+' '+this.type+' / '+this.area;
}

// Create and use instance
//
var land = new LandOwnership(50);
console.dir(land);
console.log('Cost is: '+land.calculateCost(7)+' for '+land.toString());
