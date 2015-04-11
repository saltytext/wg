function showPlayer(s) {
	updateStatus("Name: " + player.name + "<br>Level: " + player.level + " - XP: " + player.exp +"<br><br>");
	if(s == "stats"){
	updateInfo("<br>Current Stats:<br>Attack: " + player.attack + " - Speed: " + player.speed + "<br>Defense: " + player.defense + " - Max Health: " + player.maxHealth);
	}else if(s == "location"){
	updateInfo("<br>Current Location: <br>(" + player.location[0] + ", " + player.location[1] + ")");
	}else{
	updateInfo(showInventory());
	}
	updateResult('You are currently resting. What do you want to check?<br><button onclick="showPlayer(&apos;stats&apos;)">Stats</button><button onclick="showPlayer(&apos;location&apos;)">Location</button><button onclick="showPlayer(&apos;items&apos;)">Inventory</button>');
	updateActions('<br>Continue <a href="explore.html">Exploring.</a>');
}