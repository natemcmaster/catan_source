/**
	This this contains interfaces used by the map and robber views
	@module catan.map
	@namespace map
*/

var catan = catan || {};
catan.views = catan.views || {};
catan.views.overlays = catan.views.overlays || {};

catan.views.overlays.RobOverlay = (function(){
	var MainOverlay = catan.misc.BasicOverlay;
	var DisplayElement = catan.definitions.DisplayElement;
	
	var NULL_INFO = {
			color:"white",
			name:"None",
			playerNum: -1,
			cards: "OK",
		}
		
	/**
        This class implements the overlay view that lets the user select a player to rob.  
        It displays a list of other users who can be robbed, and lets the user select which one they want to rob.
		It inherits from misc.BaseOverlay.
        Its controller should be set to a MapController, on which it calls the "robPlayer" method.
		@constructor
		@class RobberOverlay
		@extends misc.BaseOverlay
	*/
	var RobberOverlay = (function(){
		
		core.forceClassInherit(RobberOverlay,MainOverlay);
        
		function RobberOverlay(){
			MainOverlay.call(this, "Choose who to Rob", 'rob');
			NULL_INFO.action = core.makeAnonymousAction(this, this.rob, [-1]);
		}
		
		core.defineProperty(RobberOverlay.prototype, "PlayerInfo");

		RobberOverlay.prototype.generateBody = function(){

			var infoArray = this.getPlayerInfo();
			var body = document.createElement("div");
				body.setAttribute("class","rob-display-area text-center");
			if(infoArray != undefined){
				if(infoArray.length == 0)
					body.appendChild(new DisplayElement.RobElement().buildView(NULL_INFO));
				for(var i = 0; i<infoArray.length; i++){
					infoArray[i].action = core.makeAnonymousAction(this, this.rob, [infoArray[i].playerNum]);
					body.appendChild(new DisplayElement.RobElement().buildView(infoArray[i]));
				}
			}
			return body;
		}
		/**
			This sets the available players to rob: an array of objects of the form 
			* { color:String,
			* 	name:String,
			* 	playerNum:int,
			* 	cards:int}
			@method setPlayerInfo
			@param{Object[]} info
		*/
		RobberOverlay.prototype.setPlayerInfo = function(info){
			this.PlayerInfo = info;
			this.setView(this.generateBody());
		}
		
		/*only called within the class*/
		RobberOverlay.prototype.rob = function(playerNum){
			this.getController().robPlayer(playerNum);
		}

		return RobberOverlay;
	}());
	
	return RobberOverlay;
}());

