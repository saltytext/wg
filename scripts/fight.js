// player array= 0name, 1health, 2attack, 3defense, 4speed, 5level, 6exp, 7dmg, 8turn, 9maxHP, 10pos, 11backpack
//var player = [];//player defaults
// monster array= 0name, 1health, 2attack, 3defense, 4speed, 5level, 6exp, 7dmg, 8expM
var monster = [];
var mNames = ["Gremlin", "Hobgoblin", "Imp", "Slime"];

//variable setup functions
function generateMonster() {
	monster = [mNames[rng(1,4)-1],rng(5,10),rng(5,10),rng(5,10),rng(5,10),player.level,0,0,1];
	if((monster[1]+monster[2]+monster[3]+monster[4]) == 40){
		monster[0] = "Flawless " + monster[0];
		monster[8] = 4;
	}else if((monster[1]+monster[2]+monster[3]+monster[4]) >= 35){
		monster[0] = "Greater " + monster[0];
		monster[8] = 2;
	}
	return monster;
}

function setDMG() {
	player.damage = (player.attack*1.5) - monster[3];
	if(player.speed <0){
		player.speed = 0;
	}
	monster[7] = (monster[2]*1.5)- player.defense;
	if(monster[7] <0){
		monster[7] = 0;
	}
	storeObject("player");
}

function giveRewards() {
	//experience
	player.exp += monster[5] * monster[8];
	//Saving
	storeObject("player");
}

function resetHealth() {
	player.health = player.maxHealth;
	storeObject("player");
}

//Tests
function speedTest() {
	//determine who attacks first, if true player goes first.
	if(player.speed >= monster[4]){
		player.turn = true;

	}else{
		player.turn = false;
	}
	storeObject("player");
}

function healthTest(){
	if(player.health <= 0){
		updateResult("Oh no! The " + monster[0] + " is too strong for you!");
		updateInfo(player.name + " has been defeated!!");
		updateActions('<a href="explore.html"><button>Explore</button></a>');
		resetHealth();
	}else if(monster[1] <= 0){
		giveRewards();
		updateStatus();
		updateResult("That " + monster[0] + " was no match for you!<br>You have defeated the " + monster[0] + "!");
		updateInfo("You are the best!");
		updateActions('<a href="explore.html"><button>Explore</button></a>');
		levelTest();
		resetHealth();
	}else{
		attack();
	}
}

function levelTest() {
	if(player.exp >= player.level * 20){
		player.exp = player.exp - (player.level* 20);
		player.level += 1;
	}
	storeObject("player");
}

//Fight Functions
function encounter() {
	loadPlayer();
	generateMonster();
	updateStatus();
	updateResult("You encounter a " + monster[0] +"!");
	updateInfo("Monster: " + monster[0] + " - Health: " + monster[1]);
	updateActions("<input type='button' value='Fight!!!' onclick='startFight()'><input type='button' value='Run...' onclick='leaveFight()'>");
}

function startFight() {
	setDMG();
	speedTest();
	updateStatus();
	if(player.turn){
		updateResult('The ' + monster[0] + ' is not aware of you.');
	}else{
		updateResult('The ' + monster[0] + ' is looking at you!');
	}
	updateInfo("Monster: " + monster[0] + " - Health: " + monster[1]);
	updateActions("<input type='button' value='Attack' onclick='attack()'>");
}

function leaveFight() {
	updateStatus();
	updateResult('You ran away like a little girl...');
	updateInfo('While running away, the ' + monster[0] +  ' taunts you.');
	updateActions('<a href="explore.html"><button>Explore</button></a>');
}

//Player Actions
function attack() {	
	if(player.turn){
		//Player attacking monster
		//monster health - playerDMG
		monster[1] -= player.damage;
		updateStatus();
		updateResult(player.name + ' attacks the ' + monster[0] +" for "+ player.damage + "!");
		updateInfo("Monster: " + monster[0] + " - Health: " + monster[1]);
		updateActions("<input type='button' value='Continue' onclick='healthTest()'>");
		player.turn = false;
	}else{
		//Monster attacking Player
		//player health - monsterDMG
		player.health -= monster[7];
		updateStatus();
		updateResult(monster[0] + ' attacks you for '+ monster[7] + "!");
		updateInfo("Monster: " + monster[0] + " - Health: " + monster[1]);
		updateActions("<input type='button' value='Continue' onclick='healthTest()'>");
		player.turn = true;
	}
	
}