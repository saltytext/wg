//overall status/state
function getStateActions(){
	if(monster.state === "Good"){
		console.log("I am Good");
	}else if(monster.state === "OK"){
		console.log("I am OK");
	}else if(monster.state === "BAD"){
		console.log("I am BAD");
	}else if(monster.state === "Scared"){
		console.log("I am Scared");
	}else if(monster.state === "Angry"){
		console.log("I am Angry");
	}
}

//monster actions
function attack(){
	return
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
	console.log("The player is at " + player.position + " and I am at " + monster.position);
	if(monster.inRange()){
		console.log("I can just attack right now...")
		//attack()
	}else{//trying without abs for now...
		x = Math.abs(monster.position[0] - player.position[0]);
		y = Math.abs(monster.position[1] - player.position[1]);
		console.log("The player is " + x + " away from me on the x.");
		console.log("The player is " + y + " away from me on the y.");
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
	console.log("The player is at " + player.position + " and I am at " + monster.position);
	if(inBounds(monster.position)){
		x = Math.abs(monster.position[0] - player.position[0]);
		y = Math.abs(monster.position[1] - player.position[1]);
		console.log("The player is " + x + " away from me on the x.");
		console.log("The player is " + y + " away from me on the y.");
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
			return
		}else if(stuckX()){
			monster.moveY(getDirY(-1));
		}else if(stuckY()){
			monster.moveX(getDirX(-1));
		}
	}
}

function changeState(s){
	monster.state = s;
	getStateActions();
}