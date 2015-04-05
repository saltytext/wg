function felsinaMain(location){
	if(location == undefined){
		var felsinaWelcome = ['Guard: The king is not taking any visitors today','Old Guard: I once fought a dragon... but that was long ago','Guard: We are the protectors of this great city!','Guard: Welcome to Felsina, ' + player.name + '. Enjoy your stay!','Old Man: Pardon me hero...','You look around Felsina and stand in awe of the Gigantic Castle.','As you enter the main square you hear a dog barking at a little boy.','There is something comforting about being home...','Guard: Don&apos;t cause any troubles here.','Rhyming Lady: I am just an NPC, don&apos;t mind me!','Rhyming Lady: You look tired, but also Inspired!','Rhyming Lady: Hope you are swell, but I must say Farewell!','Rhyming Lady: Welcome to Felsina, headed to the Cantina?','Rhyming Lady: I&apos;m a rhymer, old-timer!'];
		updateStatus(felsinaWelcome[rng(1,felsinaWelcome.length)-1]);
		updateInfo('<br>Where do you want to go?');
		updateActions('<br><input type="button" value="House" onclick="felsinaMain(0)"><input type="button" value="Trade Post" onclick="felsinaMain(1)"><input type="button" value="Felsina Armory" onclick="felsinaMain(2)"><br><input type="button" value="Dareios Castle" onclick="felsinaMain(3)"><input type="button" value="Alchemy Shop" onclick="felsinaMain(4)"><input type="button" value="Patrick&apos;s Protections" onclick="felsinaMain(5)"><br><br><input type="button" value="Leave Felsina" onclick="window.open(&apos;explore.html&apos;, &apos;_self&apos;)">');
	}else if(location == 0){
		updateStatus('You open the door to your house.. It is refreshing to be home!');
		updateInfo('<br>What do you want to do?');
		updateActions('<br><br><input type="button" value="Leave House" onclick="felsinaMain()">');
	}else if(location == 1){
		updateStatus('Shop Keeper: Welcome to the Trade Post,');
		updateInfo('<br>How can I help you today?');
		updateActions('<br><br><input type="button" value="Leave Post" onclick="felsinaMain()">');
	}else if(location == 2){
		updateStatus('Blacksmith: Hello Traveler. Have you come to equip yourself?');
		updateInfo('<br>What would you like to do?');
		updateActions('<br><br><input type="button" value="Leave Armory" onclick="felsinaMain()">');
	}else if(location == 3){
		updateStatus('Two guard&apos;s stop you....');
		updateInfo('<br>King&apos;s Guard: No visitor&apos;s today.');
		updateActions('<br><input type="button" value="Leave Castle Entrance" onclick="felsinaMain()">');
	}else if(location == 4){
		updateStatus('Alchemist: Bring me your goodies<br>and I will teach you the way&apos;s of alchemy!');
		updateInfo('<br>What do you want to do here?');
		updateActions('<br><input type="button" value="Leave Shop" onclick="felsinaMain()">');
	}else if(location == 5){
		updateStatus('Patrick: Hello there. Let me help you protect yourself...');
		updateInfo('<br>What do you want to do?');
		updateActions('<br><input type="button" value="Leave Shop" onclick="felsinaMain()">');
	}
}