//1,2,4=nothing 3=collection 5=fight
//0locationname, 1locationx,2locationy,3locationtype
var locations = [["Felsina",0,0,"town"],["Cave",20,20,"dungeon"]];
function exploreOptions(o) {
	var locationAvailable = checkLocation(player.location,locations);
	if(locationAvailable >= 0){
		updateStatus('You are currently at (' + player.location[0] + ", " + player.location[1] + ").<br>");
		updateInfo("<br>You see a " + locations[locationAvailable][3] + ",<br>Do you want to enter " + locations[locationAvailable][0] + "?<br>");
		updateResult('');
		updateActions('<br><input type="button" onclick="movePlayerY(1); exploreOptions(rng(1,5))" value="North"><br><input type="button" onclick="movePlayerX(-1); exploreOptions(rng(1,5))" value="West"><input type="button" onclick="window.open(&apos;town.html&apos;,&apos;_self&apos;)" value="Enter"><input type="button" onclick="movePlayerX(1); exploreOptions(rng(1,5))" value="East"><br><input type="button" onclick="movePlayerY(-1); exploreOptions(rng(1,5))" value="South">');
	}else{
		if(o == 5){
			updateResult('<br>You see the shadow of a figure...');
			updateInfo("<br>");
			updateActions('<a href="fight.html"><button onclick="storeObject("player")">Monster!</button></a>');
		}else if(o == 3){
			storeObject("player");
			window.open("collection.html", "_self");
		}	
		else{
			updateInfo("");
			updateResult('<br>You found nothing<br>Take a <a href="player.html">rest...</a>');
		}
	}
}

function explore() {
	var locationAvailable = checkLocation(player.location,locations);
	if(locationAvailable >= 0){
		updateStatus('You are currently at (' + player.location[0] + ", " + player.location[1] + ").<br>");
		updateInfo("<br>You see a " + locations[locationAvailable][3] + ",<br>Do you want to enter " + locations[locationAvailable][0] + "?<br>");
		updateResult('');
		updateActions('<br><input type="button" onclick="movePlayerY(1); exploreOptions(rng(1,5))" value="North"><br><input type="button" onclick="movePlayerX(-1); exploreOptions(rng(1,5))" value="West"><input type="button" onclick="window.open(&apos;town.html&apos;,&apos;_self&apos;)" value="Enter"><input type="button" onclick="movePlayerX(1); exploreOptions(rng(1,5))" value="East"><br><input type="button" onclick="movePlayerY(-1); exploreOptions(rng(1,5))" value="South">');
	}else{
		updateStatus('You are currently at (' + player.location[0] + ", " + player.location[1] + ").");
		updateResult('<br>Take a <a href="player.html">rest...</a>');
		updateActions('<br><input type="button" onclick="movePlayerY(1); exploreOptions(rng(1,5))" value="North"><br><input type="button" onclick="movePlayerX(-1); exploreOptions(rng(1,5))" value="West"><input type="button" onclick="movePlayerX(1); exploreOptions(rng(1,5))" value="East"><br><input type="button" onclick="movePlayerY(-1); exploreOptions(rng(1,5))" value="South">');
	}
}

function movePlayerX(x) {
	player.location[0] += x;
	updateStatus('You are currently at (' + player.location[0] + ", " + player.location[1] + ").");
	storeObject("player");
}

function movePlayerY(y) {
	player.location[1] += y;
	updateStatus('You are currently at (' + player.location[0] + ", " + player.location[1] + ").");
	storeObject("player");
}

function checkLocation(playerLocation, towns) {
	for(var i = 0; i < towns.length; i++){
		if(playerLocation[0] === towns[i][1] && playerLocation[1] === towns[i][2]){
			return i;
		}
	}
}