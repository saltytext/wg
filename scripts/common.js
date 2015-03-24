//Common functions
function updateNavVersion(){
	document.getElementById('nav').innerHTML = '<ul><li><a href="explore.html">Explore</a></li><li><a href="fight.html">fight</a></li><li><a href="collection.html">Collection</a></li></ul>'
	document.getElementById('version').innerHTML = "Version: 0.0.13";
}

function rng(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function storeObject(object){
    localStorage.setItem(object,JSON.stringify(window[object]));
}

function loadObject(object){
	window[object] = localStorage.getItem(object);
	window[object] = JSON.parse(localStorage.getItem(object));
}

function createPlayer(name){
	if(name == ""){
		document.getElementById("name").value = "";
		updateStatus("You did not tell me your name..");
		updateActions('<input type="button" value="Create Player" onclick="createPlayer(document.getElementById(&apos;name&apos;).value)">');
	}else if(name != ""){
		player = [name,10,10,10,7,1,0,0,false,10,[0,0],"Backpack"];
		initStorage(player[11]);
		storeObject("player");
		window.open("explore.html", "_self");
	}
}

function loadPlayer(){
    if(localStorage.getItem("player") == ""){
		updateResult("ERROR: No saved player to load");
		updateActions('Click <a href="createplayer.html">here</a> to create a new player');
		return
	}
	player = localStorage.getItem("player");
	player = JSON.parse(localStorage.getItem("player"));
	printObject("player");
}

function deleteObject(object){
	localStorage.setItem(object,"");
}

function printObject(object){
	//Used for debugging
	console.log(window[object]);
}

function resetPlayer() {
	deleteObject(player[11]);
	deleteObject("player");
	updateStatus("");
	updateResult("Your player has been reset!");
	updateInfo("");
	updateActions('Click <a href="createplayer.html">here</a> to create a new player');
}

function initStorage(name) {
	window[name] = [];
	storeObject(name);
}

function itemExists(item,storage){
	//returns location in inventory where the item exists.
	for(i=0;i < window[storage].length;i++){
		if(window[storage][i][0] == item[0]){
			return i;
		}
	}
	return "does not exist";
}

function addItem(item,storage) {
	loadObject(storage);
	p = itemExists(item,storage);
	if(p == "does not exist"){
		window[storage].push(item);
	}else{
		window[storage][p][1] += item[1];
	}
	storeObject(storage);
	printObject(storage);
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