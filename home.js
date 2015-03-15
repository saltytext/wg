// 0name, 1health, 2attack, 3defense, 4speed
var player = ["Hero",10,10,10,10];
var monster = ["Gremlin",5,5,5,5];


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

function encounter() {
	generateMonster();
	document.getElementById('result').innerHTML = "You encounter a " + monster[0] +"!";
	document.getElementById('info').innerHTML = "What do you do?";
	document.getElementById('actions').innerHTML = "<input type='button' value='Fight!!!' onclick='startFight()'><input type='button' value='Run...' onclick='leaveFight()'>";
}

function startFight() {
	document.getElementById('result').innerHTML = 'The ' + monster[0] + ' looks at you.';
	document.getElementById('info').innerHTML = "You have " + player[1] + " health left.<br> The " + monster[0] + " has " + monster[1] + " health left.";
	document.getElementById('actions').innerHTML = "<input type='button' value='Attack' onclick='attackMonster()'>";
}

function leaveFight() {
	document.getElementById('result').innerHTML = 'You ran away like a little girl...';
	document.getElementById('info').innerHTML = 'While running away, the ' + monster[0] +  ' taunts you.';
	document.getElementById('actions').innerHTML = "<input type='button' value='Return' onclick='location.reload()'>";
}

function attackMonster() {
	var pDMG = (player[2]*1.5) - monster[3];
	if(pDMG <0){
		pDMG = 0;
	}
	var mDMG = (monster[2]*1.5)- player[3];
	if(mDMG <0){
		mDMG = 0;
	}
	player[1] -= mDMG;
	monster[1] -= pDMG;
	if(player[1] <= 0){
		document.getElementById('result').innerHTML = "Oh no! The " + monster[0] + " is too strong for you!";
		document.getElementById('info').innerHTML = player[0] + " has been defeated!!";
		document.getElementById('actions').innerHTML = "<input type='button' value='Return' onclick='location.reload()'>";
	} else if(monster[1] <= 0){
		document.getElementById('result').innerHTML = "With a swift strike by " + player[0] + ", the " + monster[0] + " has been defeated!";
		document.getElementById('info').innerHTML = "You are the best!";
		document.getElementById('actions').innerHTML = "<input type='button' value='Return' onclick='location.reload()'>";
	}else{
		document.getElementById('result').innerHTML = player[0] + ' attacks the ' + monster[0] +" for "+ pDMG + "!<br>The "+ monster[0] + " attacks you for " + mDMG + "!";
		document.getElementById('info').innerHTML = "You have " + player[1] + " health left.<br> The " + monster[0] + " has " + monster[1] + " health left.";
		document.getElementById('actions').innerHTML = "<input type='button' value='Attack' onclick='attackMonster()'>";
	}
}