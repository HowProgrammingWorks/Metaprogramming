'use strict';

// Base class

class Ground
  constructor(area) {
    this.area = area;
  }

  calculateCost(price) {
    return this.area * price;
  }
}

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
    const { category, type, area } = this;
    return `${category} ${type} / ${area}`;
  }
});

// Create and use instance

const land = new LandOwnership(50);
console.dir(land);
const cost = land.calculateCost(7);
console.log(`Cost is: ${cost} for ${land.toString()}`);
