var inherit = (function() {
    var F = function() {};
    return function(Child, Parent) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.uber = Parent.prototype;
        Child.prototype.constructor = Child;
    };
}());

var mixin = (function() {
    return function (target,source,methods) {
        for (var ii = 2, il=arguments.length; ii <il ; ii++) {
            var method = arguments[ii];
            target[method] = source[method];
        }
    };
}());

var extend = (function() {
    return function(target) {
        if(!arguments[1]){
            return;
        }
        for (var ii = 1, il=arguments.length; ii <il ; ii++) {
            var source = arguments[ii];
            for (var prop in source) {
                if ( !target[prop] && source.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        }
    };
}());

function Player() {
    this.storage = new Resources(100,100,100);
    this.capacity = new Resources(100, 100, 100);
    this.increment = new Resources(0, 0, 0);
    this.population = 0;
    this.maxPopulation = 0;
}

Player.prototype.hasEnoughResources = function (cost){
    return cost.wood <= this.storage.wood && cost.stone <= this.storage.stone && cost.food <= this.storage.food;
};

function Resources(wood, stone, food) {
    this.wood = wood;
    this.stone = stone;
    this.food = food;
}

Resources.prototype.add = function(res, factor) {
    if(factor == undefined)
        factor = 1;

    this.wood += res.wood * factor;
    this.stone += res.stone * factor;
    this.food += res.food * factor;
};

Resources.prototype.addUntilMax = function(res, max) {
    if(max == undefined)
        max = player.capacity;

    this.wood += res.wood;
    if(this.wood > max.wood)
        this.wood = max.wood;
    this.stone += res.stone;
    if(this.stone > max.stone)
        this.stone = max.stone;
    this.food += res.food;
    if(this.food > max.food)
        this.food = max.food;
};

Resources.prototype.sub = function(res) {
    if(player.hasEnoughResources(res)) {
        this.wood -= res.wood;
        this.stone -= res.stone;
        this.food -= res.food;
        return true;
    } else {
        return false;
    }
};

function Building(cost) {
    this.cost = cost;
    this.count = 0;
    this.factor = 1;
}

Building.prototype.build = function(){
    if(player.storage.sub(this.cost)) {
        this.applyBenefits();
        this.count++;
        this.increaseCost(1.2);
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
};

Building.prototype.increaseCost = function(factor) {
    this.cost.wood *= factor;
    this.cost.stone *= factor;
    this.cost.food *= factor;
    this.cost.wood = this.cost.wood.toFixed(0);
    this.cost.stone = this.cost.stone.toFixed(0);
    this.cost.food = this.cost.food.toFixed(0);
};
Building.prototype.upgrade = function(factor) {
    if(this.count == 0) {
        return false;
    }
    if(factor == undefined) {
        factor = 1;
    }

    if(player.storage.sub(this.upgradeCost)) {
        var tempfactor = this.factor;
        this.factor = factor;
        this.applyBenefits();
        this.factor = tempfactor + factor;
        return true;
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        return false;
    }
};

function StorageBuilding(cost, capacity) {
    Building.apply(this, arguments);
    this.capacity = capacity;
}
inherit(StorageBuilding, Building);
StorageBuilding.prototype.applyBenefits = function(){
    player.capacity.add(this.capacity);
};

function ResidentBuilding(cost, residents) {
    Building.apply(this,arguments);
    this.upgradeCost = new Resources(100, 100, 100);
    this.residents = residents;
}
inherit(ResidentBuilding, Building);

ResidentBuilding.prototype.applyBenefits = function(){
    player.maxPopulation += this.residents * this.factor;
};


function Worker(increment) {
    this.cost = new Resources(0, 0, 10);
    this.upgradeCost = new Resources(50, 100, 50);
    this.count = 0;
    this.factor = 1;
    this.increment = increment;
}
inherit(Worker, Building);
Worker.prototype.build = function() {
    if(player.population < player.maxPopulation) {
        Worker.uber.build.call(this);
        player.population++;
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
};
Worker.prototype.applyBenefits = function () {
    player.increment.add(this.increment, this.factor)
};
