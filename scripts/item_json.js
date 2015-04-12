function itemInfo(id,attribute,source){
	//example usage: itemInfo(0,"name",item);
	return source[id][attribute];
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
	}
]};

var item = item_json.items;