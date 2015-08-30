var inherit = (function() {
    var F = function() {};
    return function(Child, Parent) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.uber = Parent.prototype;
        Child.prototype.constructor = Child;
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

Resources.prototype.add = function(res) {
    this.wood += res.wood;
    this.stone += res.stone;
    this.food += res.food;
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

Building.prototype.increaseCost = function() {
    this.cost.wood *= 1.2;
    this.cost.stone *= 1.2;
    this.cost.food *= 1.2;
    this.cost.wood = this.cost.wood.toFixed(0);
    this.cost.stone = this.cost.stone.toFixed(0);
    this.cost.food = this.cost.food.toFixed(0);
};

function StorageBuilding(cost, capacity) {
    Building.apply(this, arguments);
    this.capacity = capacity
}
inherit(StorageBuilding, Building);
StorageBuilding.prototype.applyBenefits = function(){
    player.capacity.add(this.capacity);
};


function ResidentBuilding(cost, residents) {
    Building.apply(this,arguments);
    this.residents = residents;
}
inherit(ResidentBuilding, Building);

ResidentBuilding.prototype.applyBenefits = function(){
    player.maxPopulation += this.residents;
};


function Worker(increment) {
    this.cost = new Resources(0, 0, 10);
    this.count = 0;
    this.increment = increment;
}
inherit(Worker, Building);
Worker.prototype.build = function() {
    if(player.population < player.maxPopulation) {
        Worker.uber.build.call(this);
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
};
Worker.prototype.applyBenefits = function () {
    player.increment.add(this.increment)
};