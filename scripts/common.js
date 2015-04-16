//Common functions
var player = {};

function updateNavVersion(){
	document.getElementById('nav').innerHTML = '<ul><li><a href="explore.html">Explore</a></li><li><a href="fight.html">fight</a></li><li><a href="collection.html">Collection</a></li></ul>'
	document.getElementById('version').innerHTML = "Version: 0.0.25";
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

function deleteObject(object){
	localStorage.setItem(object,"");
}

function printObject(object){
	//Used for debugging
	console.log(window[object]);
}

function createPlayer(name){
	if(name == ""){
		document.getElementById("name").value = "";
		updateStatus("You did not tell me your name..");
		updateActions('<input type="button" value="Create Player" onclick="createPlayer(document.getElementById(&apos;name&apos;).value)">');
	}else if(name != ""){
	// player array= 0name, 1health, 2attack, 3defense, 4speed, 5level, 6exp, 7dmg, 8turn, 9maxHP, 10pos, 11backpack
		player = {name: name, health: 10, attack: 10, defense: 10, speed: 7, level: 1, exp: 0, damage: 0, turn: false, maxHealth: 10, location: [0,0], inventory: []};
		storeObject("player");
		window.open("town.html", "_self");
	}
}

function showInventory() {
	var list = "<br>Current Player Inventory:";
	if(player.inventory.length == 0){
		list += '<br>Your inventory is empty';
	}else{
		for(var i = 0; i < player.inventory.length; i++){
			list += "<br>" + itemInfo(player.inventory[i][0],'name',item) + " " + player.inventory[i][1];
			}
	}
	return list;
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

function resetPlayer() {
	deleteObject("player");
	updateStatus("");
	updateResult("Your player has been reset!");
	updateInfo("");
	updateActions('Click <a href="createplayer.html">here</a> to create a new player');
}

function updateStatus(s){
	//s == undefined shows player status by default.
	if(s == undefined){
		s = "Name: " + player.name + " - Level: " + player.level + " (" + player.exp +") - Health: " + player.health;
	}
	document.getElementById('status').innerHTML = s;
}

function updateResult(r){
	document.getElementById('result').innerHTML = r;
}

function updateInfo(i){
	document.getElementById('info').innerHTML = i;
}

function updateImage(p){
	document.getElementById('image').innerHTML = "<img src=" + p + ">";
}

function updateActions(a){
	document.getElementById('actions').innerHTML = a;
}

function createTown(name, location){
	this.name = name;
	this.location = location;
}

var Felsina = new createTown("Felsina",[0,0]);

function pageLoad(){
	updateNavVersion();
	loadPlayer();
}