function collection(t){
	loadPlayer();
	updateInfo(player[0] + " was here");
	updateActions('<a href="explore.html"><button>Explore</button></a>');
	if(t == 1){
		//Mining
		updateResult("You are mining");
		mining(1);
	}else if(t == 2){
		//Woodcutting
		updateResult("You are woodcutting");
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

function woodcutting(step){
	if(step == 1){
	updateStatus("wc step1");
	updateActions('<input type="button" onclick="woodcutting(2)" value="Chop!">');
	}else if(step ==2){
	updateStatus("wc step2");
	updateActions('<input type="button" onclick="woodcutting(3)" value="Chop!">');
	}else{
	updateStatus("wc step3- click fight for now");
	updateActions('');
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