//1,2,4=nothing 3=collection 5=fight

function exploreOptions(o) {
	if(o == 5){
		updateResult('You see the shadow of a figure...');
		updateActions('<a href="fight.html"><button onclick="storePlayer()">Monster!</button></a>');
	}else if(o == 3){
		storePlayer();
		window.open("collection.html", "_self");
	}	
	else{
		updateResult('You found nothing');
	}
}

function explore() {
	loadPlayer();
	updateStatus('You are currently at (' + player[10][0] + ", " + player[10][1] + ").");
	updateActions('<input type="button" onclick="movePlayerY(1); exploreOptions(rng(1,5))" value="North"><br><input type="button" onclick="movePlayerX(-1); exploreOptions(rng(1,5))" value="West"><input type="button" onclick="movePlayerX(1); exploreOptions(rng(1,5))" value="East"><br><input type="button" onclick="movePlayerY(-1); exploreOptions(rng(1,5))" value="South">');
}

function movePlayerX(x) {
	player[10][0] += x;
	updateStatus('You are currently at (' + player[10][0] + ", " + player[10][1] + ").");
	storePlayer();
}

function movePlayerY(y) {
	player[10][1] += y;
	updateStatus('You are currently at (' + player[10][0] + ", " + player[10][1] + ").");
	storePlayer();
}