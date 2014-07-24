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

// MetaFactory to build descendant classes
//
function inheritGround(mixin) {

	var iGround = function(area) {
		this.area = area;
		for (var property in mixin) this[property] = mixin[property];
	};

	iGround.prototype = Object.create(Ground.prototype);
	return iGround;

}

// Create descendant class dynamically
//
var LandOwnership = inheritGround({ category:"land", type:"ownership" });

// Create and use instance
//
var land = new LandOwnership(50);
console.dir(land);
console.log('Cost is: '+land.calculateCost(7));
