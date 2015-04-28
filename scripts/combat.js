function rng(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var player = {
	health: 100,
	HP: 100,
	speed: 10, 
	damage: 10, 
	defense: 10, 
	range: 2,
	accuracy: 60,
	block: 0,
	position: undefined,
	attack: function(){
		if(attackHits("player", "monster")){
			window["monster"].HP -= this.damage;
		}
	},
	defend: function(){
		return (this.defense);
	},
	inRange: function(){
		if(Math.abs(Math.sqrt( Math.pow((player.position[0]-monster.position[0]), 2) + Math.pow((player.position[1]-monster.position[1]), 2) )) <= player.range){
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

var monster = {
	health: 100, 
	HP: 100,
	speed: 10, 
	damage: 20, 
	defense: 10, 
	range: 2,
	accuracy: 60,
	block: 0,
	state: "Good",//need to add in the monster brain here
	position: undefined,
	attack: function(){
		if(attackHits("monster", "player")){
			window["player"].HP -= this.damage;
		}
	},
	defend: function(){
		return (this.defense);
	},
	inRange: function(){
		if(Math.abs(Math.sqrt( Math.pow((monster.position[0]-player.position[0]), 2) + Math.pow((monster.position[1]-player.position[1]), 2) )) <= monster.range){
			return true
		}else{
			return false
		}
	},
	moveX: function(p){
		drawField('',this.position);
		this.position[0] += p;
		drawField('m',this.position);
		
	},
	moveY: function(p){
		drawField('',this.position);
		this.position[1] += p;
		drawField('m',this.position);

	}
};

function displayStats(e){
	document.getElementById(e.toLowerCase()).innerHTML = (e + "<br>" + "Health: <progress id='"+ e + "hp' value='"+ window[e].HP  +"' max='"+ window[e].health +"' title='HP Left: " + window[e].HP + "'></progress>" + "<br><br>" + "Range: " + window[e].range + "<br>" + "Speed: " + window[e].speed + "<br>" + "Damage: " + window[e].damage + "<br>" + "Defense: " + window[e].defense + "<br>" + "Accuracy: " + window[e].accuracy + "<br>" + "Block: " + window[e].block + "<br>");
}

//debug version var field = [['00','01','02','03','04','05'],['10','11','12','13','14','15'],['20','21','22','23','24','25'],['30','31','32','33','34','35'],['40','41','42','43','44','45']];
var field = [['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']];

function attackHits(a, t){
	//a = attack, t = target
	//var hitper = (window[a].accuracy - window[t].block);
	
	if(rng(1,100) <= (window[a].accuracy - window[t].block)){
		return true
	}else{
		return false
	}
}

function showField(){
	temp = '<table class="field" align="center">'+
	'<tr>'+'<td>'+field[0][5]+'</td>'+'<td>'+field[1][5]+'</td>'+'<td>'+field[2][5]+'</td>'+'<td>'+field[3][5]+'</td>'+'<td>'+field[4][5]+'</td>'+'</tr>'+
	'<tr>'+'<td>'+field[0][4]+'</td>'+'<td>'+field[1][4]+'</td>'+'<td>'+field[2][4]+'</td>'+'<td>'+field[3][4]+'</td>'+'<td>'+field[4][4]+'</td>'+'</tr>'+
	'<tr>'+'<td>'+field[0][3]+'</td>'+'<td>'+field[1][3]+'</td>'+'<td>'+field[2][3]+'</td>'+'<td>'+field[3][3]+'</td>'+'<td>'+field[4][3]+'</td>'+'</tr>'+
	'<tr>'+'<td>'+field[0][2]+'</td>'+'<td>'+field[1][2]+'</td>'+'<td>'+field[2][2]+'</td>'+'<td>'+field[3][2]+'</td>'+'<td>'+field[4][2]+'</td>'+'</tr>'+
	'<tr>'+'<td>'+field[0][1]+'</td>'+'<td>'+field[1][1]+'</td>'+'<td>'+field[2][1]+'</td>'+'<td>'+field[3][1]+'</td>'+'<td>'+field[4][1]+'</td>'+'</tr>'+
	'<tr>'+'<td>'+field[0][0]+'</td>'+'<td>'+field[1][0]+'</td>'+'<td>'+field[2][0]+'</td>'+'<td>'+field[3][0]+'</td>'+'<td>'+field[4][0]+'</td>'+'</tr>'+
	'</table>';
	document.getElementById('field').innerHTML = temp;
}

function drawField(e,p){
	//update new spot
	field[p[0]][p[1]] = e;
	showField();
}

function checkUp(){
	list = '';
	if(player.position[1] + 1 != 6 && (!(player.position[0] == monster.position[0] && player.position[1] +1 == monster.position[1]) )){
		return list += '<button onclick="player.moveY(1);monsterTurn()">U</button>';
	}else{
		return list += '<button onclick="player.moveY(1)" disabled>U</button>';
	}
}

function checkLeft(){
	list = '';
	if((player.position[0] != 0) && (!(player.position[0] -1 == monster.position[0] && player.position[1] == monster.position[1]) )){
		return list += '<button onclick="player.moveX(-1);monsterTurn()">L</button>';
	}else{
		return list += '<button onclick="player.moveY(1)" disabled>L</button>';
	}
}

function checkRight(){
	list = '';
	if(player.position[0] + 1 != 5 && (!(player.position[0] +1 == monster.position[0] && player.position[1] == monster.position[1]) )){

		return list += '<button onclick="player.moveX(1);monsterTurn()">R</button>';
	}else{
		return list += '<button onclick="player.moveY(1)" disabled>R</button>';
	}
}

function checkDown(){
	list = '';
	if(player.position[1] != 0 && (!(player.position[0] == monster.position[0] && player.position[1] -1 == monster.position[1]) )){
		return list += '<button onclick="player.moveY(-1);monsterTurn()">D</button>';
	}else{
		return list += '<button onclick="player.moveY(1)" disabled>D</button>';
	}
}

function checkAttack(){
	if(player.inRange()){
		return '<button onclick="player.attack()">Attack</button>';
	}else{
		return '<button disabled>Attack</button>';
	}
}

function getMoves(){
	list = '<div id="movement">' + checkUp() + '<br>' + checkLeft() + checkRight() + '<br>' + checkDown() + '</div><br>';
	list += '<div id="actions">' + checkAttack() + '</div>';
	//this line for monster movement testing.	list += '<br><br><button onclick="moveCloser()">Monster Closer</button><button onclick="moveFarther()">Monster Farther</button>'
	return list;
}

//0phase,1fastest,2rangeDifference,3TurnRatio,4current,5temp
var combatSettings = [1];
var combatLog = '';

function getFastest(){
	//determine who has higher speed
	if(player.speed > monster.speed){
			combatSettings[1] = 'player';
			combatLog = 'The Player is faster and will have the first attack!\n';
		}else if(monster.speed > player.speed){
			combatSettings[1] = 'monster';
			combatLog = 'The Monster is faster and will have the first attack!\n';
		}else if(player.speed === monster.speed){
			if(rng(1,2) === 1){
				combatSettings[1] = 'player';
				combatLog = 'The Player is quicker to draw their weapon and will have the first attack!\n';
			}else{
				combatSettings[1] = 'monster';
				combatLog = 'The Monster is quicker to draw their weapon and will have the first attack!\n';
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
		player.position = [2,2];
	}else{
		player.position = [2,1];
	}
}

function initMonsterPos(){
	if(monster.range === 1){
		monster.position = [2,3];
	}else{
		monster.position = [2,4];
	}
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
	drawField('p',player.position);
	drawField('m',monster.position);
	displayStats('player');
	displayStats('monster');
	if(combatSettings[1] == "player"){
		playerTurn();
	}else{
		monsterTurn();
	}
}

function showPhase(){
	document.getElementById('phase').innerHTML = 'Phase: ' + combatSettings[0];
}

function showResults(){
	document.getElementById('results').innerHTML = "<textarea id='combatlog' class='combatlog' disabled>"+ combatLog + "</textarea>";
	document.getElementById("combatlog").scrollTop = document.getElementById("combatlog").scrollHeight;
}

function showMoves(){
	document.getElementById('moves').innerHTML = getMoves();
}

function monsterTurn(){
	monster.state = "Good";
	if(rng(1,20) >= 15){
		monster.state = "Scared";
		combatLog += "The Monster is now " + monster.state + "...\n";
	}
	getStateActions();
	playerTurn();
}

function playerTurn(){
	showResults();
	showMoves();
}