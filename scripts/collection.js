function collection(t){
	loadPlayer();
	updateActions('<a href="explore.html"><button>Explore</button></a>');
	if(t == 1){
		//Mining
		updateResult("You are mining");
		mining(1);
	}else if(t == 2){
		//Woodcutting
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

function mining(step){
	if(step == 1){
	updateStatus("mine step1");
	updateActions('<input type="button" onclick="mining(2)" value="Mine!">');
	}else if(step ==2){
	updateStatus("mine step2");
	updateActions('<input type="button" onclick="mining(3)" value="Mine!">');
	}else{
	updateStatus("mine step3- click fight for now");
	updateActions('');
	}
}

function woodcutting(step, n){
	s=1; //successful reward!
	if(step == 1){
	//1initial discovery
	updateInfo("Press Chop to begin the process of collecting the wood.");
	updateActions('<input type="button" onclick="woodcutting(2)" value="Chop!">');
	}else if(step == 2){
	//2first collection with first gamble
	console.log("2");
	c1 = rng(1,2); //initial collection
	console.log(c1);
	updateStatus("You begin to chop the tree and you collect " + c1 + " wood.");
	updateResult("It looks like you could split this into another piece.");
	updateInfo("Click Split to continue gathering the wood, or Stop to leave.");
	updateActions('<input type="button" onclick="woodcutting(3, rng(1,100))" value="Split!"><a href="explore.html"><button>Stop</button></a>');
	}else if(step == 3 && n >= 75){
	//3successful gamble, next gamble offer. 75
	console.log("3 :"+ n);
	s +=1; //increase the successful reward. such luck!
	c2 = (c1 + rng(1,2) + s); //current bonus collection!
	console.log(c2);
	updateStatus("You currently have collected " + c2 + " wood.");
	updateResult("It looks like you can possibly split this wood up into more.");
	updateInfo("Click Split to continue gathering the wood, or Stop to leave.");
	updateActions('<input type="button" onclick="woodcutting(3, rng(1,100))" value="Split!"><a href="explore.html"><button>Stop</button></a>');
	console.log("s"+ s);
	}else if(step == 3 && n >= 50){
	//4unsuccessful gamble. back to exploring. 50
	console.log("4 :"+ n);	
	c2 = c1; //meh you get initial amount.
	updateStatus("You did not gain any pieces...");
	updateResult("You have received " + c2 + " wood.");
	updateActions('<a href="explore.html"><button>Explore</button></a>');
	}else{
	//5Lost gamble risk. Time to pay...?
	console.log("5 :"+ n);
	n2 = rng(1,3);
		if(n2 != 1){
		//5aLost everything.
		console.log("5a "+ n2);
		updateStatus("You have destroyed all the wood.");
		updateResult("You are unable to salvage any pieces to collect.");
		updateInfo("");
		}else{
		//5bLost but keep initial winning of c1
		console.log("5b " + n2);
		updateStatus("You have destroyed some of the wood.");
		updateResult("You were able to salvage " + c1 + " pieces.");
		updateInfo("");
		}
		updateActions('<a href="explore.html"><button>Explore</button></a>');
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