function rng(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var player = {
	health: 100, 
	speed: 10, 
	damage: 10, 
	defense: 10, 
	range: 2,
	accuracy: 40,
	block: 10,
	position: undefined,
	attack: function(){
		return (this.damage);
	},
	defend: function(){
		return (this.defense);
	},
	inRange: function(){
		if(Math.abs(player.position[0] - monster.position[0]) + Math.abs(player.position[1] - monster.position[1]) === player.range){
			return true
		}else{
			return false
		}
	},
	moveY: function(p){
		drawField('',this.position);
		this.position[0] += p;
		drawField('p',this.position);
	},
	moveX: function(p){
		drawField('',this.position);
		this.position[1] += p;
		drawField('p',this.position);

	}
};

var monster = {
	health: 100, 
	speed: 10, 
	damage: 20, 
	defense: 10, 
	range: 2,
	accuracy: 40,
	block: 10,
	position: undefined,
	attack: function(){
		return (this.damage);
	},
	defend: function(){
		return (this.defense);
	},
	inRange: function(){
		if(Math.abs(monster.position[0] - player.position[0]) + Math.abs(monster.position[1] - player.position[1]) === monster.range){
			return true
		}else{
			return false
		}
	},
	moveX: function(p){
		drawField('',this.position);
		this.position[0] += p;
		drawField('p',this.position);
	},
	moveY: function(p){
		drawField('',this.position);
		this.position[1] += p;
		drawField('p',this.position);

	}
};

var field = [
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
];

function showField(){
	temp = '<table align="center">'+
	'<tr><td>'+field[5][0]+'</td><td>'+field[5][1]+'</td><td>'+field[5][2]+'</td><td>'+field[5][3]+'</td><td>'+field[5][4]+'</td></tr>'+
	'<tr><td>'+field[4][0]+'</td><td>'+field[4][1]+'</td><td>'+field[4][2]+'</td><td>'+field[4][3]+'</td><td>'+field[4][4]+'</td></tr>'+
	'<tr><td>'+field[3][0]+'</td><td>'+field[3][1]+'</td><td>'+field[3][2]+'</td><td>'+field[3][3]+'</td><td>'+field[3][4]+'</td></tr>'+
	'<tr><td>'+field[2][0]+'</td><td>'+field[2][1]+'</td><td>'+field[2][2]+'</td><td>'+field[2][3]+'</td><td>'+field[2][4]+'</td></tr>'+
	'<tr><td>'+field[1][0]+'</td><td>'+field[1][1]+'</td><td>'+field[1][2]+'</td><td>'+field[1][3]+'</td><td>'+field[1][4]+'</td></tr>'+
	'<tr><td>'+field[0][0]+'</td><td>'+field[0][1]+'</td><td>'+field[0][2]+'</td><td>'+field[0][3]+'</td><td>'+field[0][4]+'</td></tr>'+
	'</table>';
	document.getElementById('field').innerHTML = temp;
}

function drawField(e,p){
	//update new spot
	field[p[0]][p[1]] = e;
	showField();
}

function checkLeft(){
	list = '';
	if(player.position[1] -1 != 0){
		//can move Left
		return list += '<button onclick="player.moveX(-1)">Left</button>';
	}
	return list;
}

function checkRight(){
	list = '';
	if(player.position[1] + 1 >= 4){
		//can move Forward
		return list += '<button onclick="player.moveX(1)">Right</button>';
	}
	return list;
}

function getMoves(){
	list = checkLeft() + '<br>' + checkRight();
	return list;
}
//0phase,1fastest,2rangeDifference,3TurnRatio,4current,5temp
var combatSettings = [1];
var combatLog = '';

function getFastest(){
	//determine who has higher speed
	if(player.speed > monster.speed){
			combatSettings[1] = 'player';
			combatLog = 'The Player is faster and will have the first attack!<br>';
		}else if(monster.speed > player.speed){
			combatSettings[1] = 'monster';
			combatLog = 'The Monster is faster and will have the first attack!<br>';
		}else if(player.speed === monster.speed){
			if(rng(1,2) === 1){
				combatSettings[1] = 'player';
				combatLog = 'The Player is quicker to draw their weapon and will have the first attack!<br>';
			}else{
				combatSettings[1] = 'monster';
				combatLog = 'The Monster is quicker to draw their weapon and will have the first attack!<br>';
			}
		}
		return combatSettings;
}

function getTurnRatio(){
	//determine how many attacks that person gets before the other person goes
	if(combatSettings[0] === 'player'){
		combatSettings[2] = Math.round((player.speed * player.range) / (monster.speed * monster.range));
		combatSettings[3] = combatSettings[2];
	}else{
		combatSettings[2] = Math.round((monster.speed * monster.range) / (player.speed * player.range));
		combatSettings[3] = combatSettings[2];
	}
}

function initPlayerPos(){
	if(player.range === 1){
		player.position = [3,2];
	}else{
		player.position = [4,2];
	}
	drawField('p',player.position);
}

function initMonsterPos(){
	if(monster.range === 1){
		monster.position = [2,2];
	}else{
		monster.position = [1,2];
	}
	drawField('m',monster.position);
}

function combatSetup(){
	//determine who has higher speed
	getFastest();
	//determine how many attacks that person gets before the other person goes
	getTurnRatio();
	//place player and monster
	initPlayerPos();
	initMonsterPos();
	//show results
	console.log(combatSettings);
}

function combatTurn(){
	combatSetup();
	showPhase();
	showField();
	showResults();
	showMoves();
}
function showPhase(){
	document.getElementById('phase').innerHTML = 'Phase: ' + combatSettings[0];
}
function showResults(){
	document.getElementById('results').innerHTML = combatLog;
}
function showMoves(){
	document.getElementById('moves').innerHTML = getMoves();
}