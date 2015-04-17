//overall status/state
function getStateActions(){
	if(monster.state === "Good"){
		attack();
		//console.log("I am Good");
	}else if(monster.state === "OK"){
		console.log("I am OK");
	}else if(monster.state === "BAD"){
		console.log("I am BAD");
	}else if(monster.state === "Scared"){
		moveFarther();
	}else if(monster.state === "Angry"){
		console.log("I am Angry");
	}
}

//monster actions
function attack(){
	if(monster.inRange()){
		combatLog += "The monster would be attacking you right now.." + "\n";
	}else{
		moveCloser();
	}
}

function heal(){
	return
}

function runaway(){
	return
}

//monster subactions
function useSkill(){
	return
}

function stuckX(){
	if((monster.position[0] - 1>= 0 && monster.position[0] + 1 <= 4)){
		return false
	}else{
		return true
	}
}
function stuckY(){
	if((monster.position[1] -1 >= 0 && monster.position[1] + 1 <= 5)){
		return false
	}else{
		return true
	}
}

function inBounds(){
	if(!(stuckX()) && !(stuckY())){
		return true
	}else{
		return false
	}
}

function getDirX(v){
	dir = -(monster.position[0] - player.position[0]);
	if(dir > 0){
		return 1*v;
	}else{
		return -1*v;
	}
}

function getDirY(v){
	dir = -(monster.position[1] - player.position[1]);
	if(dir > 0){
		return 1*v;
	}else{
		return -1*v;
	}
}

function moveCloser(){
	combatLog += "The Monster is moving closer to you!" + "\n";
	if(monster.inRange()){
		attack();
	}else{
		x = Math.abs(monster.position[0] - player.position[0]);
		y = Math.abs(monster.position[1] - player.position[1]);
		if(x > y){
			monster.moveX(getDirX(1));
		}else if(x === y){
			if(rng(1,2) === 1){
				monster.moveX(getDirX(1));
			}else{
				monster.moveY(getDirY(1));
			}
		}else{
			monster.moveY(getDirY(1));
		}
	}
	
}

function moveFarther(){
	combatLog += "The Monster is moving farther away from you!" + "\n";
	if(inBounds(monster.position)){
		x = monster.position[0] - player.position[0];
		y = monster.position[1] - player.position[1];
		if(x > y){
			monster.moveX(getDirX(-1));
		}else if(x === y){
			if(rng(1,2) === 1){
				monster.moveX(getDirX(-1));
			}else{
				monster.moveY(getDirY(-1));
			}
		}else{
			monster.moveY(getDirY(-1));
		}
	}else if(x === y){
		if(rng(1,2) === 1){
			monster.moveX(getDirX(-1));
		}else{
			monster.moveY(getDirY(-1));
		}
	}else{
		if(stuckX() && stuckY()){
			leaveCorner();			
		}else if(stuckX()){
			monster.moveY(getDirY(-1));
		}else if(stuckY()){
			monster.moveX(getDirX(-1));
		}
	}
}

function changeState(s){
	monster.state = s;
	//getStateActions(); note this one might not be needed..
}

function checkMonsterUp(){
	if(monster.position[1] + 1 != 6 && (!(monster.position[0] == player.position[0] && monster.position[1] +1 == player.position[1]) )){
		return true;
	}else{
		return false;
	}
}

function checkMonsterLeft(){
	list = '';
	if((monster.position[0] != 0) && (!(monster.position[0] -1 == player.position[0] && monster.position[1] == player.position[1]) )){
		return true;
	}else{
		return false;
	}
}

function checkMonsterRight(){
	list = '';
	if(monster.position[0] + 1 != 5 && (!(monster.position[0] +1 == player.position[0] && monster.position[1] == player.position[1]) )){
		return true;
	}else{
		return false;
	}
}

function checkMonsterDown(){
	list = '';
	if(monster.position[1] != 0 && (!(monster.position[0] == player.position[0] && monster.position[1] -1 == player.position[1]) )){
		return true;
	}else{
		return false;
	}
}

function leaveCorner(){
	if(monster.position[0] == 0 && monster.position[1] == 0){
		if(checkMonsterUp()){
			monster.moveY(1);
		}else if(checkMonsterRight()){
			monster.moveX(1);
		}
	}else if(monster.position[0] == 4 && monster.position[1] == 5){
		if(checkMonsterDown()){
			monster.moveY(-1);
		}else if(checkMonsterLeft()){
			monster.moveX(-1);
		}
	}else if(monster.position[0] == 0 && monster.position[1] == 5){
		if(checkMonsterDown()){
			monster.moveY(-1);
		}else if(checkMonsterRight()){
			monster.moveX(1);
		}
	}else if(monster.position[0] == 4 && monster.position[1] == 0){
		if(checkMonsterUp()){
			monster.moveY(1);
		}else if(checkMonsterLeft()){
			monster.moveX(-1);
		}
	}
}