'use strict';

// Base class

function Ground(area) {
  this.area = area;
}

Ground.prototype.calculateCost = function(price) {
  return this.area * price;
};

// MetaFactory to build descendant classes

const inheritGround = mixin => {

  const DescendantGround = function(area) {
    this.constructor(area);
    this.isEmpty = parseInt(area) <= 0;
  };

  DescendantGround.prototype = Object.create(Ground.prototype);

  // Mixin properties to descendant class prototype
  Object.assign(DescendantGround.prototype, mixin);
  return DescendantGround;

};

// Create descendant class dynamically

const LandOwnership = inheritGround({
  category: 'land',
  type: 'ownership',
  // Add method to descendant class prototype
  toString() {
    return this.category + ' ' + this.type + ' / ' + this.area;
  }
});

// Create and use instance

const land = new LandOwnership(50);
console.dir(land);
console.log('Cost is: ' + land.calculateCost(7) + ' for ' + land.toString());
