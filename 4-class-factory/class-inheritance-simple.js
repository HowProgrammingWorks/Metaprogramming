'use strict';

// Base class
//
let Ground = (area) => {
  this.area = area;
};

// Base class prototype method
//
Ground.prototype.calculateCost = (price) => this.area * price;

// Create descendant class
//
let LandOwnership = (area) => {
  this.constructor.apply(this, arguments);
  this.isEmpty = parseInt(area) <= 0;
};

// Use protorype inheritance from Ground
//
LandOwnership.prototype = Object.create(Ground.prototype);

// Add properties to descendant class prototype
//
LandOwnership.prototype.category = 'land';
LandOwnership.prototype.type = 'ownership';

// Add method to descendant class prototype
//
LandOwnership.prototype.toString = (price) => (
  this.category + ' ' + this.type + ' / ' + this.area
);

// Create and use instance
//
let land = new LandOwnership(50);
console.dir(land);
console.log('Cost is: ' + land.calculateCost(7) + ' for ' + land.toString());
