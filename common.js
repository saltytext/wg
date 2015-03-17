//Common functions
function updateVersion(){
	document.getElementById('version').innerHTML = "Version: 0.0.7";
}

function rng(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function storePlayer(){
    localStorage.setItem("player",JSON.stringify(player));
}

function loadPlayer(){
    player = localStorage.getItem("player");
	player = JSON.parse(player);
}

function deletePlayer(){
	localStorage.removeItem(player);
}

function printPlayer(){
	//Used for debugging
	console.log(player);
}

function updateStatus(s){
	//s == undefined shows player status by default.
	if(s == undefined){
		s = "Name: " + player[0] + " - Level: " + player[5] + " (" + player[6] +") - Health: " + player[1];
	}
	document.getElementById('status').innerHTML = s;
}

function updateResult(r){
	document.getElementById('result').innerHTML = r;
}

function updateInfo(i){
	//i == undefined shows monster status by default.
	if(i == undefined){
		i = "Monster: " + monster[0] + " - Health: " + monster[1];
	}
	document.getElementById('info').innerHTML = i;
}

function updateActions(a){
	document.getElementById('actions').innerHTML = a;
}