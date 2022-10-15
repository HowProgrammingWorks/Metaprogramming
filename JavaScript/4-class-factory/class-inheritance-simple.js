'use strict';

// Base class

class Ground {
  constructor(area) {
    this.area = area;
  }

  calculateCost(price) {
    return this.area * price;
  }
}

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
  const { category, type, area } = this;
  return `${category} ${type} / ${area}`;
};

// Create and use instance

const land = new LandOwnership(50);
console.dir(land);
const cost = land.calculateCost(7);
console.log(`Cost is: ${cost} for ${land.toString()}`);
