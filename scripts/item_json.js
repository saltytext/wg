function itemInfo(id,attribute,source){
	//example usage: itemInfo(0,"name",item);
	return source[id][attribute];
}

function addItem(storage, item){
	if(item[1] == 0){
		return
	}else if(storage.length == 0){
		storage.push(item);
		return
	}else{
		for(var i = 0;i <= storage.length;i++){
			if(storage[i] == undefined){
				storage.push(item);
				return
			}else if(storage[i][0] == item[0]){
				storage[i][1] += item[1];
				return
			}
		}
	}
}

function removeItem(storage, item){
	if(item[1] == 0){
		return
	}else{
		for(var i = 0;i <= storage.length;i++){
			if(storage[i][0] == item[0]){
				if(storage[i][1] - item[1] <= 0){
					storage.splice(i,1);
					return
				}else{
					storage[i][1] -= item[1];
					return
				}
			}
		}
	}
}

var item_json = {"items":[
	{
	"id":0,
	"name":"Wood",
	"value":10,
	"description":"Used for crafting staffs",
	"type":"Crafting"
	},
	{
	"id":1,
	"name":"Stone",
	"value":10,
	"description":"Used for crafting ???",
	"type":"Crafting"
	},
	{
	"id":2,
	"name":"Gem",
	"value":20,
	"description":"An unidentified gem.. What could it be?",
	"type":"Consumable"
	},
	{
	"id":3,
	"name":"Iron",
	"value":15,
	"description":"Used for making various weapons",
	"type":"Crafting"
	},
	{
	"id":4,
	"name":"Aqua Berry",
	"value":5,
	"description":"Berries can be used to regain health.",
	"type":"Consumable"
	},
	{
	"id":5,
	"name":"Nector",
	"value":10,
	"description":"Used for making potions",
	"type":"Crafting"
	},
	{
	"id":6,
	"name":"Tangelo",
	"value":10,
	"description":"Eat this fruit to regain health.",
	"type":"Consumable"
	},
	{
	"id":7,
	"name":"Powder",
	"value":10,
	"description":"Used for making potions",
	"type":"Crafting"
	},
	{
	"id":8,
	"name":"Coin Purse",
	"value":0,
	"description":"Open this coin purse for a random amount of coins.",
	"type":"Consumable"
	},
	{
	"id":9,
	"name":"Monster Eye",
	"value":5,
	"description":"An eye of a monster.",
	"type":"Quest Item"
	},
	{
	"id":10,
	"name":"Green Goo",
	"value":5,
	"description":"The remains of a monster.",
	"type":"Quest Item"
	},
	{
	"id":11,
	"name":"Monster Bones",
	"value":5,
	"description":"The bones of a monster.",
	"type":"Quest Item"
	},
	{
	"id":12,
	"name":"Coins",
	"value":5,
	"description":"Wealth is always represented by gold coins right?",
	"type":"Currency"
	}
]};

var item = item_json.items;