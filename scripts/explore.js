//1,2,4=nothing 3=collection 5=fight

function exploreOptions(o) {
	if(o == 5){
		updateResult('You see the shadow of a figure...');
		updateActions('<a href="fight.html"><button onclick="storeObject("player")">Monster!</button></a>');
	}else if(o == 3){
		storeObject("player");
		window.open("collection.html", "_self");
	}	
	else{
		updateResult('You found nothing<br>Take a <a href="player.html">rest...</a>');
	}
}

function explore() {
	loadPlayer();
	updateStatus('You are currently at (' + player.location[0] + ", " + player.location[1] + ").");
	updateResult('Take a <a href="player.html">rest...</a>');
	updateActions('<input type="button" onclick="movePlayerY(1); exploreOptions(rng(1,5))" value="North"><br><input type="button" onclick="movePlayerX(-1); exploreOptions(rng(1,5))" value="West"><input type="button" onclick="movePlayerX(1); exploreOptions(rng(1,5))" value="East"><br><input type="button" onclick="movePlayerY(-1); exploreOptions(rng(1,5))" value="South">');
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