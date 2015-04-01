var co = [];

function collection(t){
	loadPlayer();
	updateActions('<a href="explore.html"><button>Explore</button></a>');
	if(t == 1){
		//Mining, co = 0type,1initial,2bonus,3stop
		co = ["",0,0,0];
		updateResult("You see some exposed earth..");
		mining(1);
	}else if(t == 2){
		//Woodcutting, co = 0success,1initial,2bonus,3stop
		co = [1,0,0,0];
		updateStatus("You see a tree");
		woodcutting(1);
	}else if(t == 3){
		//Gathering
		updateResult("You are gathering");
		gathering(1);
	}else{
		//Treasure chest
		updateResult("You are lock picking");
		lockpicking(1);
	}
}

function mining(step, n){
	if(step == 1){
	//1initial discovery
	updateInfo("Press Prospect to identify if there is anything here.");
	updateActions('<input type="button" onclick="mining(2,rng(1,2))" value="Prospect!">');
	}else if(step == 2){
	//2discovery 1 is stone, 2 is iron
	updateStatus("You begin to prospect and....");
	co[1] = rng(1,2);
	if(n == 1){
		co[0] = "Iron";
		updateResult("and identify some IRON!!");
		updateInfo("Click Mine to gather the iron.");
	}else{
		co[0] = "Stone";
		updateResult("it looks to just be STONE.");
		updateInfo("Click Mine to gather some stone.");
	}
	updateActions('<input type="button" onclick="mining(3,rng(50,100))" value="Mine!">');
	//note updateactions should be onclick="mining(3,rng(1,100)):
	}else if(step == 3 && n >= 95){
	//Collected some and found a GEM! can continue
	addItem(player.inventory,["Gem",1]);
	storeObject("player");
	co[2] = (co[1] + co[2]);
	co[3] = co[2];
	updateStatus("Great Success!!! You have found a Rare Gem, and stop to grab it!<br>");
	updateResult("Additionally you collected " + co[2] + " " + co[0] + "!");
	updateInfo("You can see a bit more " + co[0] + ". Continue mining?");
	updateActions('<input type="button" onclick="mining(3, rng(1,94))" value="Yes"><input type="button" onclick="mining(&apos;stop&apos;,co[2])" value="Stop">');
	}else if(step == 3 && n >= 75){
	//Collect a lot and can continue
	co[2] = (co[1] + rng(2,4) + co[2]);
	co[3] = co[2];
	updateStatus("You strike the earth and a huge chunk falls off!");
	updateResult("You have collected " + co[2] + " " + co[0] + "!");
	updateInfo("You can see a bit more " + co[0] + ". Continue mining?");
	updateActions('<input type="button" onclick="mining(3, rng(1,100))" value="Yes"><input type="button" onclick="mining(&apos;stop&apos;,co[2])" value="Stop">');
	}else if(step == 3 && n >= 50){
	//Collected some and can continue
	co[2] = (co[1] + rng(1,2) + co[2]);
	co[3] = co[2];
	updateStatus("You manage to collect some " + co[0] + "...");
	updateResult("You currently have collected " + co[2] + " " + co[0]);
	updateInfo("You can see a bit more " + co[0] + ". Continue mining?");
	updateActions('<input type="button" onclick="mining(3, rng(1,100))" value="Yes"><input type="button" onclick="mining(&apos;stop&apos;,co[2])" value="Stop">');
	}else if(step == 3 && n <= 49){
	//risky time
		n2 = rng(1,3);
		if(n2 != 1){
		//5aLost get nothing.
		updateStatus("You swing a strong blow with your pickaxe.");
		updateResult("You destroyed all of your existing " + co[0] +".");
		updateInfo("");
		updateActions('<a href="explore.html"><button>Explore</button></a>'); //you do not get anything.
		}else{
		//5bLost but keep initial winning of c1
		updateStatus("You have destroyed some of the " + co[0]);
		updateResult("You were able to salvage " + co[1] + " pieces.");
		updateInfo("");
		updateActions('<button onclick="addItem(player.inventory,[co[0];,co[1]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
		}
	}else if(step == "stop"){
		updateStatus("");
		updateResult("You have collected " + co[3] + " " + co[0] + ".");
		updateInfo("");
		updateActions('<button onclick="addItem(player.inventory,[co[0],co[3]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
	}
}

function woodcutting(step, n){
	if(step == 1){
	//1initial discovery
	updateInfo("Press Chop to begin the process of collecting the wood.");
	updateActions('<input type="button" onclick="woodcutting(2)" value="Chop!">');
	}else if(step == 2){
	//2first collection with first gamble
	co[1] = rng(1,2); //initial collection
	co[3] = co[1];
	updateStatus("You begin to chop the tree and you collect " + co[1] + " wood.");
	updateResult("It looks like you could split this into another piece.");
	updateInfo("Click Split to continue gathering the wood, or Stop to leave.");
	updateActions('<input type="button" onclick="woodcutting(3, rng(1,100))" value="Split!"><input type="button" onclick="woodcutting(&apos;stop&apos;,co[1])" value="Stop">');
	}else if(step == 3 && n >= 75){
	//3successful gamble, next gamble offer. 75
	co[0] += 1; //increase the successful reward. such luck!
	co[2] = (co[1] + rng(1,2) + co[0] + co[2]); //current bonus collection!
	co[3] = co[2];
	updateStatus("You currently have collected " + co[2] + " wood.");
	updateResult("It looks like you can possibly split this wood up into more.");
	updateInfo("Click Split to continue gathering the wood, or Stop to leave.");
	updateActions('<input type="button" onclick="woodcutting(3, rng(1,100))" value="Split!"><input type="button" onclick="woodcutting(&apos;stop&apos;,co[2])" value="Stop">');
	}else if(step == 3 && n >= 50){
	//4unsuccessful gamble. back to exploring. 50
	//meh you get initial amount.
	updateStatus("You did not gain any pieces...");
	updateResult("You have received " + co[1] + " wood.");
	updateActions('<button onclick="addItem(player.inventory,[&apos;Wood&apos;,co[1]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
	}else if(step == 3 && n <= 49){
	//5Lost gamble risk. Time to pay...?
	n2 = rng(1,3);
		if(n2 != 1){
		//5aLost get nothing.
		updateStatus("You have destroyed all the wood.");
		updateResult("You are unable to salvage any pieces to collect.");
		updateInfo("");
		updateActions('<a href="explore.html"><button>Explore</button></a>'); //you do not get anything.
		}else{
		//5bLost but keep initial winning of c1
		updateStatus("You have destroyed some of the wood.");
		updateResult("You were able to salvage " + co[1] + " pieces.");
		updateInfo("");
		updateActions('<button onclick="addItem(player.inventory,[&apos;Wood&apos;,co[1]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
		}
	}else if(step == "stop"){
		updateStatus("");
		updateResult("You have collected " + co[3] + " wood.");
		updateInfo("");
		updateActions('<button onclick="addItem(player.inventory,[&apos;Wood&apos;,co[3]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
	}
}

function gathering(step){
	if(step == 1){
	updateStatus("gathering step1");
	updateActions('<input type="button" onclick="gathering(2)" value="Gather!">');
	}else if(step ==2){
	updateStatus("gathering step2");
	updateActions('<input type="button" onclick="gathering(3)" value="Gather!">');
	}else{
	updateStatus("gathering step3- click fight for now");
	updateActions('');
	}
}

function lockpicking(step){
	if(step == 1){
	updateStatus("pick step1");
	updateActions('<input type="button" onclick="lockpicking(2)" value="Attempt!">');
	}else if(step ==2){
	updateStatus("pick step2");
	updateActions('<input type="button" onclick="lockpicking(3)" value="Attempt!">');
	}else{
	updateStatus("pick step3- click fight for now");
	updateActions('');
	}
}