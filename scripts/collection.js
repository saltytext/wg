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
		//Gathering co = 0plant,1resource,2amount,3stop
		co = ["","",0,0];
		switch(rng(1,4)){
			case 1:
				co[0] = "Aquilla Plant";
				co[1] = "Aqua Berry";
				break;
			case 2:
				co[0] = "Golden Bush";
				co[1] = "Nector";
				break;
			case 3:
				co[0] = "Tangelo Shrub";
				co[1] = "Tangelo";
				break;
			case 4:
				co[0] = "Broadleaf";
				co[1] = "Powder";
				break;
		}
		gathering(1);
	}else{
		//lock picking
		//locked chest co = 0item, 1amount, 2difficulty, 3bashable, 4guessesR, 5correct, 6guess
		//Eventually this will be a random of all items in game
		co = ["",0,5,false,2,rng(1,12),0]
		switch(rng(1,3)){
			case 1:
				co[0] = "Coin Purse";
				co[1] = rng(2,10);
				co[2] = rng(1,2);
				if(rng(1,100) <= 40){
					co[3] = true;
				}
				break;
			case 2:
				co[0] = "Gem";
				co[1] = rng(2,3);
				co[2] = rng(1,3);
				if(rng(1,100) >= (95 + co[2])){
					co[3] = true;
				}
				break;
			case 3:
				co[0] = "worthless trash";
				if(rng(1,100) <= 60){
					co[3] = true;
				}
				break;
		}
		updateStatus("You stumbled across a locked chest at someone's camp");
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
	co[2] = (co[1] + rng(1,2) + co[2]);
	co[3] = co[2];
	updateStatus("You strike the earth and a huge chunk falls off!");
	updateResult("You have collected " + co[2] + " " + co[0] + "!");
	updateInfo("You can see a bit more " + co[0] + ". Continue mining?");
	updateActions('<input type="button" onclick="mining(3, rng(1,100))" value="Yes"><input type="button" onclick="mining(&apos;stop&apos;,co[2])" value="Stop">');
	}else if(step == 3 && n >= 50){
	//Collected some and can continue
	co[2] = (co[1] + co[2]);
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
		updateActions('<button onclick="addItem(player.inventory,[co[0],co[1]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
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

function gathering(step, n){
	if(step == 1){
	//initial discovery
	updateStatus("You stop to smell the roses....");
	updateResult("You see a " + co[0]);
	updateActions('<input type="button" onclick="gathering(2,rng(1,2))" value="Gather!">');
	}else if(step == 2){
	//initial collection
	co[2] = rng(1,2) + n;
	co[3] = co[2];
	updateStatus("Approaching the " + co[0] + "...");
	updateResult("You can see " + co[2] + " " + co[1] + ".");
	updateInfo('Do you want to search for more ' + co[1] + "?");
	updateActions('<input type="button" onclick="gathering(3,rng(1,100))" value="Search!">');
	}else if(step == 3 && n >= 60) {
	//successful risk
	co[2] = rng(2,3);
	co[3] += co[2];
	updateStatus("You search for a short time in the " + co[0]);
	updateResult("and able to find " + co[2] + " more " + co[1] + ".");
	updateInfo('Do you want to search for more ' + co[1] + "?<br>Or stop and keep " + co[3]);
	updateActions('<input type="button" onclick="gathering(3,rng(1,2))" value="Search!"><input type="button" onclick="gathering(&apos;stop&apos;)" value="Stop">');
	}else if(step == 3 && n >= 50) {
	//unsuccessful risk losing some of them.
	co[2] = rng(1,co[3]);
	co[3] -= co[2];
	updateStatus("You continue to search for a short time.. Ouch!");
	updateResult("You reached your hand right into a POISONOUS THORN..");
	updateInfo("You are forced to use " + co[2] + " " + co[1] + " to cure the wound.");
	updateActions('<input type="button" onclick="gathering(&apos;stop&apos;,rng(1,2))" value="Stop">');
	}else if(step == 3 && n >= 1) {
	//unsuccessful risk losing some of them.
	updateStatus("You spend a bit of time searching...");
	updateResult("You find no more " + co[1]);
	updateInfo("Feeling discouraged you decide to Stop");
	updateActions('<input type="button" onclick="gathering(&apos;stop&apos;,rng(1,2))" value="Stop">');
	}else{
	updateStatus("");
	updateResult("You collected " + co[3] + " " + co[1]);
	updateInfo("");
	updateActions('<button onclick="addItem(player.inventory,[co[1],co[3]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
	}
}

function lockpicking(step, g1){
	//step#, result
	if(step == 1){
	//initial bash or attempt decision
	updateResult("No one is around...");
	updateInfo("Do you want to attempt and pick the lock or bash it open?");
	updateActions('<input type="button" onclick="lockpicking(2,0)" value="Attempt!"><input type="button" onclick="lockpicking(3)" value="Bash!">');
	}else if(step == 2 && g1 != "win"){
		if(co[4] == 0){
			//guesses remaining == 0
			updateStatus("You put your lockpick in the lock and begin to slowly turn it..");
			updateResult("The lock does NOT OPEN");
			updateInfo("The lock appears to be stuck...");
			updateActions('<button onclick="window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
		}else if(co[4] > 0){
			//you have guesses remaining
			co[4] -= 1;
			if(g1 == "f"){
				updateStatus("The lock does not budge... try again.");
			}else{
				updateStatus("You begin to study the lock");
			}
			updateResult("Select a number and direction to turn.");
			updateInfo('<input type="button" value="12" id="12" onclick="buttonClicked(12)" style=""><input type="button" value="1" id="1" onclick="buttonClicked(1)" style=""><br><input type="button" value="11" id="11" onclick="buttonClicked(11)" style=""><button disabled>X</button><input type="button" value="2" id="2" onclick="buttonClicked(2)" style=""><br><input type="button" value="10" id="10" onclick="buttonClicked(10)" style=""><button disabled>X</button><button disabled>X</button><input type="button" value="3" id="3" onclick="buttonClicked(3)" style=""><br><input type="button" value="9" id="9" onclick="buttonClicked(9)" style=""><button disabled>X</button><input type="button" value="4" id="4" onclick="buttonClicked(4)" style=""><br><input type="button" value="8" id="8" onclick="buttonClicked(8)" style=""><input type="button" value="5" id="5" onclick="buttonClicked(5)" style=""><br><input type="button" value="7" id="7" onclick="buttonClicked(7)" style=""><input type="button" value="6" id="6" onclick="buttonClicked(6)" style="">');
			updateActions('<br><button onclick="checkLockLeft()" title="Counter Clockwise">Turn CCW</button><button onclick="checkLockRight()" title="Clockwise">Turn CW</button>');
		}
	}else if(g1 == "win"){
		updateStatus("You put your lockpick in the lock and start to turn it...");
		updateResult("*CLICK* the lock OPENS!!! You open the chest.");
		if(co[1] == 0){
		updateInfo("Inside, you just see worthless trash...");
		updateActions('<button onclick="storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore...</button>');
		}else{
		updateInfo("Inside you see a glorious glow of " + co[1] + " " + co[0] + "s!!!");
		updateActions('<button onclick="addItem(player.inventory,[co[0],co[1]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Grab and Run!</button>');
		}
	}else if(step == 3){
	//bash decision
		if(co[3]){
			//it is bashable and you get to collect
			updateStatus("With all of your might...");	
			updateResult("You were able to bash the lock off!! You open quickly open the chest..");
			if(co[1] == 0){
				updateInfo("Inside you just see worthless trash...");
				updateActions('<button onclick="storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore...</button>');
			}else{
				updateInfo("Inside you see " + co[1] + " " + co[0] + "s!!!");
				updateActions('<button onclick="addItem(player.inventory,[co[0],co[1]]);storeObject(&apos;player&apos;);window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Grab and Run!</button>');
			}
		}else{
			updateStatus("With all of your might...");	
			updateResult("You broke the lock off, but the chest still remains closed...");
			updateInfo("");
			updateActions('<button onclick="window.open(&apos;explore.html&apos;, &apos;_self&apos;);">Explore</button>');
		}
	}else if(step == "collect"){
	updateStatus("pick step3- click fight for now");
	updateActions('');
	}
}

function buttonClicked(n) {
	co[6] = n;
	for(var i = 1; i != 13; i++){
		if(i == n){
		
			document.getElementById(n).style="border-style:inset;";
		}else{
		document.getElementById(i).style="";
		}
	}
}

function checkLockLeft() {
	for(var i = 0;i < co[2];i++){
		var nn = co[6] - i;
		if(nn <= 0){
			nn += 12;
		}
		if(nn == co[5]){
			return lockpicking(2,"win");
		}
	}
	return lockpicking(2,"f");
}

function checkLockRight() {
	for(var i = 0;i < co[2];i++){
		var nn = co[6] + i;
		if(nn > 12){
			nn -= 12;
		}
		if(nn == co[5]){
			return lockpicking(2,"win");
		}
	}
	return lockpicking(2,"f");
}