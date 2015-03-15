// 0name, 1health, 2attack, 3defense, 4speed, 5level, 6exp, 7dmg, 8turn
var player = ["Hero",10,10,10,7,1,0,0,false];
var monster = ["!not set!",5,5,5,5,1,0,0,false];


function rng(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMonster() {
	var mNames = ["Gremlin", "Hobgoblin", "Imp", "Slime"];
	monster = [mNames[rng(1,4)-1],rng(5,10),rng(5,10),rng(5,10),rng(5,10)];
	if((monster[1]+monster[2]+monster[3]+monster[4]) == 40){
		monster[0] = "Flawless " + monster[0];
	}else if((monster[1]+monster[2]+monster[3]+monster[4]) >= 35){
		monster[0] = "Greater " + monster[0];
	}
	return monster;
}

function speedTest() {
	//determine who attacks first, if true player goes first.
	if(player[4] >= monster[4]){
		return player[8] = true;

	}else{
		return player[8] = false;
	}
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
}

function encounter() {
	generateMonster();
	document.getElementById('status').innerHTML = "Name: " + player[0] + " - Level: " + player[5] + " - Health: " + player[1];
	document.getElementById('result').innerHTML = "You encounter a " + monster[0] +"!";
	document.getElementById('info').innerHTML = "Monster: " + monster[0] + " - Health: " + monster[1];
	document.getElementById('actions').innerHTML = "<input type='button' value='Fight!!!' onclick='startFight()'><input type='button' value='Run...' onclick='leaveFight()'>";
}

function startFight() {
	setDMG();
	speedTest();
	document.getElementById('status').innerHTML = "Name: " + player[0] + " - Level: " + player[5] + " - Health: " + player[1];
	if(player[8]){
		document.getElementById('result').innerHTML = 'The ' + monster[0] + ' is not aware of you.';
	}else{
		document.getElementById('result').innerHTML = 'The ' + monster[0] + ' is looking at you!';
	}
	document.getElementById('info').innerHTML = "Monster: " + monster[0] + " - Health: " + monster[1];
	document.getElementById('actions').innerHTML = "<input type='button' value='Attack' onclick='attack()'>";
}

function leaveFight() {
	document.getElementById('status').innerHTML = "Name: " + player[0] + " - Level: " + player[5] + " - Health: " + player[1];
	document.getElementById('result').innerHTML = 'You ran away like a little girl...';
	document.getElementById('info').innerHTML = 'While running away, the ' + monster[0] +  ' taunts you.';
	document.getElementById('actions').innerHTML = "<input type='button' value='Return' onclick='location.reload()'>";
}



function attack() {	
	if(player[8]){
		//Player attacking monster
		//monster health - playerDMG
		monster[1] -= player[7];
		document.getElementById('status').innerHTML = "Name: " + player[0] + " - Level: " + player[5] + " - Health: " + player[1];
		document.getElementById('result').innerHTML = player[0] + ' attacks the ' + monster[0] +" for "+ player[7] + "!";
		document.getElementById('info').innerHTML = "Monster: " + monster[0] + " - Health: " + monster[1];
		document.getElementById('actions').innerHTML = "<input type='button' value='Continue' onclick='healthTest()'>";
		player[8] = false;
	}else{
		//Monster attacking Player
		//player health - monsterDMG
		player[1] -= monster[7];
		document.getElementById('status').innerHTML = "Name: " + player[0] + " - Level: " + player[5] + " - Health: " + player[1];
		document.getElementById('result').innerHTML = monster[0] + ' attacks you for '+ monster[7] + "!";
		document.getElementById('info').innerHTML = "Monster: " + monster[0] + " - Health: " + monster[1];
		document.getElementById('actions').innerHTML = "<input type='button' value='Continue' onclick='healthTest()'>";
		player[8] = true;
	}
	
}

function healthTest(){
	if(player[1] <= 0){
		document.getElementById('result').innerHTML = "Oh no! The " + monster[0] + " is too strong for you!";
		document.getElementById('info').innerHTML = player[0] + " has been defeated!!";
		document.getElementById('actions').innerHTML = "<input type='button' value='Return' onclick='location.reload()'>";
	}else if(monster[1] <= 0){
		document.getElementById('result').innerHTML = "That " + monster[0] + " was no match for you!<br>You have defeated the " + monster[0] + "!";
		document.getElementById('info').innerHTML = "You are the best!";
		document.getElementById('actions').innerHTML = "<input type='button' value='Return' onclick='location.reload()'>";
	}else{
		attack();
	}
}