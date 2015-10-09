var Building = {
  applyBenefits: function () {
    // ...
  }
};
// StorageBuilding inherits from "Building"
var StorageBuilding = Object.create(Building);
StorageBuilding.applyBenefits = function () {
  // ...
};
//ResidentBuilding inherits from "Building"
var ResidentBuilding = Object.create(Building);
ResidentBuilding.applyBenefits = function () {
  // ..
};

// StorageResidentBuilding inherits from StorageBuilding and ResidentBuilding
var StorageResidentBuilding = Object.extend({
  applyBenefits: function () {
    StorageBuilding.applyBenefits.apply(this);
    ResidentBuilding.applyBenefits.apply(this);
  }
}, StorageBuilding, ResidentBuilding);

Object.prototype.extend = function () {
  var hasOwnProperty = Object.hasOwnProperty;
  var object = Object.create(this);
  var length = arguments.length;
  var index = length;
  while (index) {
    var extension = arguments[length - (index--)];
    for (var property in extension)
      if (hasOwnProperty.call(extension, property) || typeof object[property] === "undefined")
        object[property] = extension[property];
  }
  return object;
};
