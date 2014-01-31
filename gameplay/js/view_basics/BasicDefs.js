//these are basic definitions that we use all over in building the views

var catan = catan || {};

catan.definitions = {
	
	PageViewIDs:
	{
		
		resourceArea:"resources",
		trackerArea:"turn-tracker-pane",
		gameStateArea:"game-state-pane",
		pointsArea:"points",
		
		maritimeArea:"maritime-trade-pane",
		domesticArea:"domestic-trade-pane",
		mapArea:"map-pane",
		
		chatArea:"chat-pane",
		logArea:"log-pane",
		
		chatNotifier:"",//chat-tab, chat-output
		logNotifier:"",//log-tab, log-output
		
	},
	
	GroupNames:
	{
		maritimeSend:"maritime-send",
		maritimeReceive:"maritime-receive",
		domestic:"domestic-trade",
		discard:"discard",
		card:"dev-card",
		resourceAction:"resource-action",
		resourceDisplay:"resource-display",
		resourceOverlay:"resource-overlay"
	},
	
	DisplayElementTypes:{
		domesticTrade:"domesticTrade",
		maritimeTrade:"maritimeTrade",
		maritimeUndo:"maritimeUndo",
		discard:"discard",
		resource:"resource",
		buyable:"buyable",
		devCard:"devCard"
	},
	InputLabelStyle:"span1 text-center amount-textbox ",
	MaritimeUndo:"maritime-undo",
	
	//resources
	ResourceTypes:["wood","brick","sheep","wheat","ore"],
	ResourceImages:{
		wood:"wood.png",
		brick:"brick.png",
		sheep:"sheep.png",
		wheat:"wheat.png",
		ore:"ore.png",
		resources:"resources.png",
		prefix:"../images/resources/"
	},
	
	HexTypes :["desert","water"],//and each of the resourceTypes
	WATER_HEX: "water",
	DESERT_HEX: "desert",

	//buyables
	ROAD:"Roads",
	SETTLEMENT:"Settlements",
	CITY:"Cities",
	BUY_CARD:"BuyCard",
	PLAY_CARD:"DevCards",
	ARMY: "Soldiers",
	
	BuyableTypes:["Roads","Settlements","Cities", "BuyCard"],
	OverlayTypes:["DevCards"],
	DisplayTypes:["Soldiers"],
	BuyableImages:{
		Roads:"road.png",
		Settlements:"settlement.png",
		Cities:"city.png",
		BuyCard:"card.jpg",
		DevCards:"development_card.jpg",
		Soldiers:"soldier.jpg",
		prefix:"../images/building/"
	},

	//development cards
	SOLDIER:"soldier",
	YEAR_OF_PLENTY:"yearOfPlenty",
	MONOPOLY:"monopoly",
	ROAD_BUILD:"roadBuilding",
	MONUMENT:"monument",
	
	CardTypes :["soldier","yearOfPlenty","monopoly","roadBuilding", "monument"],
	CardImages :{
		 soldier:"soldier.jpg",
		 yearOfPlenty:"year-of-plenty.jpg",
		 monopoly:"monopoly.jpg",
		 roadBuilding:"road-building.jpg",
		 monument:"monument.jpg",
		 prefix:"../images/cards/"
	},
	CardInfo :{
		soldier: "Soldier: you steal a card. the size of your army increases.",
		yearOfPlenty: "Year Of Plenty: pick 2 resources. you get 1 of each",
		monopoly: "Monopoly: pick a resource. everyone has to give you theirs",
		roadBuilding: "Road Building: you get 2 free roads to place",
		monument: "Monument: you get a free point"
	},
	PointImages :{
		visible: "full_point.png",
		empty: "empty_point.png",
		prefix: "../images/victory_points/"
	},

	//misc images
	MiscImages:{
		robber:"robber.gif",
		armyAward:"army.png",
		roadAward:"road.png",
		waitImage:"hourglass.png",
		rollImage:"dice.jpg",
		increase:"up.png",
		decrease:"down.png",
		equals:"equals.png",
		refresh:"reload.png",
		disallow:"noIcon.png",
		winner:"winner.png",
		loser:"loser.png",
		prefix:"../images/misc/"
	},

	//colors
	ColorDefs:{
		red:"#e34234",
		redHighlight:"#ec8177",
		redOutline:"#9c2016",
		
		orange:"orange",
		orangeHighlight:"#ffd280",
		orangeOutline:"#cd5100",
		
		blue:"#6fb7f6",
		blueHighlight:"#b7dbfb",
		blueOutline:"#0b5fa9",
		
		yellow:"#fde069",
		yellowHighlight:"#fef0b4",
		yellowOutline:"#e49203",
		
		green:"#6dc066",
		greenHighlight:"#a1d69c",
		greenOutline:"#367630",
		
		purple:"#9d8cd4",
		purpleHighlight:"#ccc4e9",
		purpleOutline:"#563da3",
		
		puce:"#CC8899",
		puceHighlight:"#e3bec7",
		puceOutline:"#944055",
		
		white:"#dfdfdf",
		whiteHighlight:"white",
		whiteOutline:"#939393",
		
		brown:"#a18f70",
		brownHighlight:"#bfb39e",
		brownOutline:"#584d3a"
	},
	
	IDs:core.enumeration({
		chat:"chat",
		log:"log"
	}),
	
}

