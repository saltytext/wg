//Common functions
function updateNavVersion(){
	document.getElementById('nav').innerHTML = '<ul><li><a href="explore.html">Explore</a></li><li><a href="fight.html">fight</a></li><li><a href="collection.html">Collection</a></li></ul>'
	document.getElementById('version').innerHTML = "Version: 0.0.11";
}

function rng(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPlayer(name){
	if(name == ""){
		document.getElementById("name").value = "";
		updateStatus("You did not tell me your name..");
		updateActions('<input type="button" value="Create Player" onclick="createPlayer(document.getElementById(&apos;name&apos;).value)">');
	}else if(name != ""){
		player = [name,10,10,10,7,1,0,0,false,10,[0,0]];
		storePlayer();
		window.open("explore.html", "_self");
	}
}

function storePlayer(){
	//console.log("h");
    localStorage.setItem("player",JSON.stringify(player));
}

function loadPlayer(){
    if(localStorage.getItem("player") == ""){
		updateResult("ERROR: No saved player to load");
		updateActions('Click <a href="createplayer.html">here</a> to create a new player');
		return
	}
	player = localStorage.getItem("player");
	player = JSON.parse(localStorage.getItem("player"));
}

function deletePlayer(){
	localStorage.setItem("player","");
}

function printPlayer(){
	//Used for debugging
	if(player == ""){
		console.log("undefined player");
	}
	console.log(player);
}

function resetPlayer() {
	deletePlayer();
	updateStatus("");
	updateResult("Your player has been reset!");
	updateInfo("");
	updateActions('Click <a href="createplayer.html">here</a> to create a new player');
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

function updateImage(p){
	document.getElementById('image').innerHTML = "<img src=" + p + ">";
}

function updateActions(a){
	document.getElementById('actions').innerHTML = a;
}