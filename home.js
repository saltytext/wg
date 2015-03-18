// player array= 0name, 1health, 2attack, 3defense, 4speed, 5level, 6exp, 7dmg, 8turn, 9maxHP, 10pos
var player = ["Hero",10,10,10,7,1,0,0,false,10,[0,0]];//player defaults
// monster array= 0name, 1health, 2attack, 3defense, 4speed, 5level, 6exp, 7dmg, 8expM
var monster = [];
var mNames = ["Gremlin", "Hobgoblin", "Imp", "Slime"];

//variable setup functions
function generateMonster() {
	monster = [mNames[rng(1,4)-1],rng(5,10),rng(5,10),rng(5,10),rng(5,10),player[5],0,0,1];
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
	player[7] = (player[2]*1.5) - monster[3];
	if(player[7] <0){
		player[7] = 0;
	}
	monster[7] = (monster[2]*1.5)- player[3];
	if(monster[7] <0){
		monster[7] = 0;
	}
	storePlayer();
}

function giveRewards() {
	//experience
	player[6] += monster[5] * monster[8];
	//Saving
	storePlayer();
}

function resetHealth() {
	player[1] = player[9];
	storePlayer();
}

function resetPlayer() {
	deletePlayer();
	storePlayer();
	loadPlayer();
	updateStatus("");
	updateResult("Your player has been reset!");
	updateInfo("");
	updateActions("Click the Home link above to start a new adventure...");
}

//Tests
function speedTest() {
	//determine who attacks first, if true player goes first.
	if(player[4] >= monster[4]){
		player[8] = true;

	}else{
		player[8] = false;
	}
	storePlayer();
}

function healthTest(){
	if(player[1] <= 0){
		updateResult("Oh no! The " + monster[0] + " is too strong for you!");
		updateInfo(player[0] + " has been defeated!!");
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
	if(player[6] >= player[5]* 20){
		player[6] = player[6] - (player[5]* 20);
		player[5] += 1;
	}
	storePlayer();
}

//Fight Functions
function encounter() {
	loadPlayer();
	generateMonster();
	updateStatus();
	updateResult("You encounter a " + monster[0] +"!");
	updateInfo();
	updateActions("<input type='button' value='Fight!!!' onclick='startFight()'><input type='button' value='Run...' onclick='leaveFight()'>");
}

function startFight() {
	setDMG();
	speedTest();
	updateStatus();
	if(player[8]){
		updateResult('The ' + monster[0] + ' is not aware of you.');
	}else{
		updateResult('The ' + monster[0] + ' is looking at you!');
	}
	updateInfo();
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
	if(player[8]){
		//Player attacking monster
		//monster health - playerDMG
		monster[1] -= player[7];
		updateStatus();
		updateResult(player[0] + ' attacks the ' + monster[0] +" for "+ player[7] + "!");
		updateInfo();
		updateActions("<input type='button' value='Continue' onclick='healthTest()'>");
		player[8] = false;
	}else{
		//Monster attacking Player
		//player health - monsterDMG
		player[1] -= monster[7];
		updateStatus();
		updateResult(monster[0] + ' attacks you for '+ monster[7] + "!");
		updateInfo();
		updateActions("<input type='button' value='Continue' onclick='healthTest()'>");
		player[8] = true;
	}
	
}