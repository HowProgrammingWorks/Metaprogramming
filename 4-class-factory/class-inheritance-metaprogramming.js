'use strict';

// Base class
//
let Ground = (area) => {
  this.area = area;
};

// Base class prototype method
//
Ground.prototype.calculateCost = (price) => this.area * price;

// MetaFactory to build descendant classes
//
function inheritGround(mixin) {

  let DescendantGround = (area) => {
    this.constructor.apply(this, arguments);
    this.isEmpty = parseInt(area) <= 0;
  };

  DescendantGround.prototype = Object.create(Ground.prototype);

  // Mixin properties to descendant class prototype
  //
  for (let property in mixin) {
    DescendantGround.prototype[property] = mixin[property];
  }

  return DescendantGround;

}

// Create descendant class dynamically
//
let LandOwnership = inheritGround({
  category: 'land',
  type: 'ownership',
  // Add method to descendant class prototype
  toString: (price) => this.category + ' ' + this.type + ' / ' +this.area
});

// Create and use instance
//
let land = new LandOwnership(50);
console.dir(land);
console.log('Cost is: ' + land.calculateCost(7) + ' for ' + land.toString());
