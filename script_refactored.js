var player = new Player();
var woodStorage = new StorageBuilding(new Resources(50, 50, 0), new Resources(100, 0, 0));
var stoneStorage = new StorageBuilding(new Resources(50, 50, 0), new Resources(0, 100, 0));
var foodStorage = new StorageBuilding(new Resources(50, 50, 0), new Resources(0, 0, 100));

var tent = new ResidentBuilding(new Resources(30, 0, 0), 1);
var house = new ResidentBuilding(new Resources(75, 25, 0), 4);
var hostel = new ResidentBuilding(new Resources(200, 215, 0), 10);

var lumberjack = new Worker(new Resources(1, 0, 0));
var miner = new Worker(new Resources(0, 1, 0));
var hunter = new Worker(new Resources(0, 0, 1));

// Variables
var names = {
        town: "",
        mayor: ""
    },
    wood = {
        name: "wood",
        increment: 0
    },
    stone = {
        name: "stone",
        increment: 0
    },
    food = {
        name: "food",
        increment: 0
    },
    worker = {
        name: "worker",
        amount: 0,
        lumberjack: {
            increment: 1,
            amount: 0,
            cost: 10
        },
        miner: {
            increment: 1,
            amount: 0,
            cost: 10
        },
        hunter: {
            increment: 1,
            amount: 0,
            cost: 10
        }
    };

var maxPop = (tent.residents * tent.amount) + (house.residents * house.amount);
var clickIncrement = 1; // Consider changing this to specific materials.

// All OnLoad Functions
// Modal Commented out during development
$(document).ready(function () {
    //$('#onLoadModal').modal();
    beginTick();
    updateValues();


    // Get town and mayor names and display them.
    $('#modalClose').click(function () {
        names.town = document.getElementById('town').value;
        document.getElementById("townName").innerHTML = names.town;
        names.mayor = document.getElementById('mayor').value;
        document.getElementById("mayorName").innerHTML = names.mayor;
    });

    function beginTick() {
        nIntervId = setInterval(tick, 5000);
    }

    function tick() {
        gatherWood();
        gatherStone();
        gatherFood();
    }

    // Display the correct values.
    function updateValues() {
        document.getElementById("woodAmount").innerHTML = player.storage.wood;
        document.getElementById("maxWood").innerHTML = player.capacity.wood;
        document.getElementById("woodIncrement").innerHTML = wood.increment;
        document.getElementById("stoneAmount").innerHTML = player.storage.stone;
        document.getElementById("maxStone").innerHTML = player.capacity.stone;
        document.getElementById("stoneIncrement").innerHTML = stone.increment;
        document.getElementById("foodAmount").innerHTML = player.storage.food;
        document.getElementById("maxFood").innerHTML = player.capacity.food;
        document.getElementById("foodIncrement").innerHTML = food.increment;

        document.getElementById("workerAmount").innerHTML = worker.amount;
        document.getElementById("maxPop").innerHTML = player.maxPopulation;
        document.getElementById("lumberjackAmount").innerHTML = worker.lumberjack.amount;
        document.getElementById("lumberjackCost").innerHTML = worker.lumberjack.cost;
        document.getElementById("minerAmount").innerHTML = worker.miner.amount;
        document.getElementById("minerCost").innerHTML = worker.miner.cost;
        document.getElementById("hunterAmount").innerHTML = worker.hunter.amount;
        document.getElementById("hunterCost").innerHTML = worker.hunter.cost;

        $("#tentAmount").html(tent.count);
        document.getElementById("tentCostWood").innerHTML = tent.cost.wood;
        document.getElementById("tentResidents").innerHTML = tent.residents;
        document.getElementById("houseAmount").innerHTML = house.count;
        document.getElementById("houseCostWood").innerHTML = house.cost.wood;
        document.getElementById("houseCostStone").innerHTML = house.cost.stone;
        document.getElementById("houseResidents").innerHTML = house.residents;
        document.getElementById("hostelAmount").innerHTML = hostel.count;
        document.getElementById("hostelCostWood").innerHTML = hostel.cost.wood;
        document.getElementById("hostelCostStone").innerHTML = hostel.cost.stone;
        document.getElementById("hostelResidents").innerHTML = hostel.residents;
        document.getElementById("woodStorageAmount").innerHTML = woodStorage.count;
        document.getElementById("woodStorageCostWood").innerHTML = woodStorage.cost.wood;
        document.getElementById("woodStorageCostStone").innerHTML = woodStorage.cost.stone;
        document.getElementById("stoneStorageAmount").innerHTML = stoneStorage.count;
        document.getElementById("stoneStorageCostWood").innerHTML = stoneStorage.cost.wood;
        document.getElementById("stoneStorageCostStone").innerHTML = stoneStorage.cost.stone;
        document.getElementById("foodStorageAmount").innerHTML = foodStorage.count;
        document.getElementById("foodStorageCostWood").innerHTML = foodStorage.cost.wood;
        document.getElementById("foodStorageCostStone").innerHTML = foodStorage.cost.stone;
    }

    // Click to Chop, Mine, Gather
    $('#chopWood').click(function () {
        player.storage.wood += clickIncrement;
        checkMaxWood();
        updateValues();
    });

    $('#mineStone').click(function () {
        player.storage.stone += clickIncrement;
        checkMaxStone();
        updateValues();
    });

    $('#gatherFood').click(function () {
        player.storage.food += clickIncrement;
        checkMaxFood();
        updateValues();
    });

    // Create Workers
    $('#createLumberjack').click(function () {
        lumberjack.build();
        updateValues();
    });

    $('#createMiner').click(function () {
        miner.build();
        updateValues();
    });

    $('#createHunter').click(function () {
        hunter.build();
        updateValues();
    });

    // Lumberjacks Gather Wood
    function gatherWood() {
        player.increment.wood = lumberjack.increment.wood * lumberjack.count;
        player.storage.wood += player.increment.wood;
        checkMaxWood();
        updateValues();
    }

    // Miner Gather Stone
    function gatherStone() {
        player.increment.stone = miner.increment.stone * miner.count;
        player.storage.stone += player.increment.stone;
        checkMaxStone();
        updateValues();
    }

    // Hunter Gather Food
    function gatherFood() {
        player.increment.food = hunter.increment.food * hunter.count;
        player.storage.food += player.increment.food;
        checkMaxFood();
        updateValues();
    }

    // Test max resources
    function checkMaxWood() {
        if (wood.amount > wood.max) {
            wood.amount = wood.max;
        }
    }

    function checkMaxStone() {
        if (stone.amount > stone.max) {
            stone.amount = stone.max;
        }
    }

    function checkMaxFood() {
        if (food.amount > food.max) {
            food.amount = food.max;
        }
    }

    function save_game() {
        localStorage['rpg_save[wood]'] = btoa(JSON.stringify(wood));
        localStorage['rpg_save[stone]'] = btoa(JSON.stringify(stone));
        localStorage['rpg_save[food]'] = btoa(JSON.stringify(food));
        localStorage['rpg_save[worker]'] = btoa(JSON.stringify(worker));

        localStorage['rpg_save[tent]'] = btoa(JSON.stringify(tent));
        localStorage['rpg_save[house]'] = btoa(JSON.stringify(house));
        localStorage['rpg_save[hostel]'] = btoa(JSON.stringify(hostel));
    }

    function load_game() {
        if (!localStorage['rpg_save[wood]']) return;


        var wood_save = JSON.parse(atob(localStorage['rpg_save[wood]']));
        var stone_save = JSON.parse(atob(localStorage['rpg_save[stone]']));
        var food_save = JSON.parse(atob(localStorage['rpg_save[food]']));
        var worker_save = JSON.parse(atob(localStorage['rpg_save[worker]']));

        var tent_save = JSON.parse(atob(localStorage['rpg_save[tent]']));
        var house_save = JSON.parse(atob(localStorage['rpg_save[house]']));
        var hostel_save = JSON.parse(atob(localStorage['rpg_save[hostel]']));
        wood = wood_save;
        stone = stone_save;
        food = food_save;
        worker = worker_save;

        tent = tent_save;
        house = house_save;
        hostel = hostel_save;
        maxPop = (tent.residents * tent.amount) + (house.residents * house.amount);
        updateValues();
    }

    // Build a tent
    $('#buildTent').click(function () {
        tent.build();
        updateValues();
    });

    // Build a house
    $('#buildHouse').click(function () {
        house.build();
        updateValues();
    });

    // Research Hostel
    $('#researchHostel').click(function () {
        if (wood.amount >= 400 && stone.amount >= 150) {
            wood.amount = wood.amount - 400;
            stone.amount = stone.amount - 150;

            $('#researchHostel').addClass('hidden');
            $('.progress-wrap-hostel').removeClass('hidden');

            var getPercent = ($('.progress-wrap-hostel').data('progress-percent-hostel') / 100);
            var getProgressWrapWidth = $('.progress-wrap-hostel').width();
            var progressTotal = getPercent * getProgressWrapWidth;
            var animationLength = 25000;

            $('.progress-bar-hostel').stop().animate({
                    left: progressTotal
                },
                animationLength,
                function () {
                    $('#buildHostel').removeClass('hidden');
                    $('.progress-wrap-hostel').addClass('hidden');
                    $('.hostelInfo').removeClass('hidden');
                    $('.hostelResearchInfo').addClass('hidden');
                });
        } else {
            $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
        }
    });

    // Build a hostel
    $('#buildHostel').click(function () {
        hostel.build();
        updateValues();
    });

    // Build wood storage
    $('#buildWoodStorage').click(function () {
        woodStorage.build();
        updateValues();
    });

    // Build stone storage
    $('#buildStoneStorage').click(function () {
        stoneStorage.build();
        updateValues();
    });

    // Build food storage
    $('#buildFoodStorage').click(function () {
        foodStorage.build();
        updateValues();
    });

    // Upgrades
    $('#upgradeTwoFingers').click(function () {
        if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            wood.amount = wood.amount - 100;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 100;
            clickIncrement = clickIncrement + 1;
            $('.upgradeTwoFingers').addClass('hidden');
            $('.upgradeFiveFingers').removeClass('hidden');
            $("#upgrades").prepend($('<p>Two Fingers | Two Resources Per Click</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeFiveFingers').click(function () {
        if (wood.amount >= 450 && stone.amount >= 450 && food.amount >= 120) {
            wood.amount = wood.amount - 450;
            stone.amount = stone.amount - 450;
            food.amount = food.amount - 120;
            clickIncrement = clickIncrement + 3;
            $('.upgradeFiveFingers').addClass('hidden');
            $("#upgrades").prepend($('<p>Five Fingers | Five Resources Per Click</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeDoubleSleepingBags').click(function () {
        if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            wood.amount = wood.amount - 100;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 100;
            tent.residents = 2;
            maxPop = maxPop + tent.amount; //This only works because we are adding ONE resident.
            $('.upgradeDoubleSleepingBags').addClass('hidden');
            $("#upgrades").prepend($('<p>Double Sleeping Bags | Two People, One Tent</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeBunkBeds').click(function () {
        if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
            wood.amount = wood.amount - 100;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 100;
            house.residents = 5;
            maxPop = maxPop + house.amount; //This only works because we are adding ONE resident.
            $('.upgradeBunkBeds').addClass('hidden');
            $("#upgrades").prepend($('<p>Bunk Beds | Five People, One House</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeSharpenAxes').click(function () {
        if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
            wood.amount = wood.amount - 50;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 50;
            worker.lumberjack.increment = 2;
            wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
            $('.upgradeSharpenAxes').addClass('hidden');
            $("#upgrades").prepend($('<p>Sharpen Axes | Lumberjacks Chop Two Wood Each</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeSharpenPicks').click(function () {
        if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
            wood.amount = wood.amount - 50;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 50;
            worker.miner.increment = 2;
            stone.increment = worker.miner.increment * worker.miner.amount;
            $('.upgradeSharpenPicks').addClass('hidden');
            $("#upgrades").prepend($('<p>Sharpen Picks | Miners Mine Two Stone Each</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeSharpenArrows').click(function () {
        if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
            wood.amount = wood.amount - 50;
            stone.amount = stone.amount - 100;
            food.amount = food.amount - 50;
            worker.hunter.increment = 2;
            food.increment = worker.hunter.increment * worker.hunter.amount;
            $('.upgradeSharpenArrows').addClass('hidden');
            $("#upgrades").prepend($('<p>Sharpen Arrows | Hunters Gather Two Food Each</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeMatesRatesWood').click(function () {
        if (stone.amount >= 150 && food.amount >= 50) {
            stone.amount = stone.amount - 150;
            food.amount = food.amount - 50;
            house.cost.wood = house.cost.wood - 20;
            tent.cost.wood = tent.cost.wood - 15;
            $('.upgradeMatesRatesWood').addClass('hidden');
            $("#upgrades").prepend($('<p>Mates Rates - Wood | Houses and Tents Cost Less Wood</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });

    $('#upgradeMatesRatesStone').click(function () {
        if (wood.amount >= 150 && food.amount >= 50) {
            wood.amount = wood.amount - 150;
            food.amount = food.amount - 50;
            house.cost.stone = house.cost.stone - 20;
            $('.upgradeMatesRatesStone').addClass('hidden');
            $("#upgrades").prepend($('<p>Mates Rates - Stone | Houses Cost Less Stone</p>').fadeIn('slow'));
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
        }
    });
    setInterval(function () {
        save_game();
    }, 10000);
    //load_game();
});
/*document.ready*/

