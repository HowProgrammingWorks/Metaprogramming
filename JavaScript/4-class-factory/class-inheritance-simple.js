'use strict';

// Base class

function Ground(area) {
  this.area = area;
}

Ground.prototype.calculateCost = function(price) {
  return this.area * price;
};

// Create descendant class

function LandOwnership(area) {
  this.constructor(area);
  this.isEmpty = parseInt(area) <= 0;
}

// Use protorype inheritance from Ground
LandOwnership.prototype = Object.create(Ground.prototype);

// Add properties to descendant class prototype
LandOwnership.prototype.category = 'land';
LandOwnership.prototype.type = 'ownership';

// Add method to descendant class prototype
LandOwnership.prototype.toString = function() {
  return this.category + ' ' + this.type + ' / ' + this.area;
};

// Create and use instance

const land = new LandOwnership(50);
console.dir(land);
console.log('Cost is: ' + land.calculateCost(7) + ' for ' + land.toString());
