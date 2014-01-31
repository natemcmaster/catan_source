/**
    This is the namespace for maritime trading
    @module catan.trade
    @submodule catan.trade.maritime
    @namespace maritime
*/

var catan = catan || {};
catan.trade = catan.trade || {};
catan.trade.maritime = catan.trade.maritime || {};

catan.trade.maritime.View = (function trade_namespace(){

	var DisplayElement = catan.definitions.DisplayElement;
	var Definitions = catan.definitions;
	var UNDO = Definitions.MaritimeUndo;
	var SEND_GROUP = Definitions.GroupNames.maritimeSend;
	var RECEIVE_GROUP =  Definitions.GroupNames.maritimeReceive;
	var GroupNames = [SEND_GROUP, RECEIVE_GROUP];
	
	var ResourceTypes = Definitions.ResourceTypes;
	
    var KEEP_VISIBLE = true;  
      
    /**
        A view for setting up trades between the client player and the bank.	
        @class MaritimeView 
        @constructor
    **/
	var MaritimeView = (function MaritimeView_Class(){
                
		function MaritimeView(){
			this.setResourceElems({});
			this.setUndoElems({});
		};

		core.defineProperty(MaritimeView.prototype, "Controller");
		core.defineProperty(MaritimeView.prototype, "ResourceElems");
		core.defineProperty(MaritimeView.prototype, "UndoElems");
		core.defineProperty(MaritimeView.prototype, "TradeButton");
                
        /**
		 Attaches the controller to the view and builds the view on the page.
		 @method setController
		 @param {maritime.Controller} controller
		 @return void
		 */
        MaritimeView.prototype.setController = function(controller){
			this.Controller = controller;
			buildView.call(this);
		}
		
		/**
		 Shows all the resources, enabling the ones the player can give, and disabling the ones he can't.
		 @method showGiveOptions
		 @param {String[]} resources the resources the player can give, based on current ports
		 */
		MaritimeView.prototype.showGiveOptions = function(resources){
           showAll.call(this, GroupNames[0], resources);
		}
        
		/**
		 Hides all the resources except the one the player has selected.
		 @method selectGiveOption
		 @param {String} resource the resource the player has selected to give (a resource: "wood","brick","sheep","wheat","ore")
		 @param {int} the amount the player has to give of the selected resource
		 */
		MaritimeView.prototype.selectGiveOption = function(resource, portAmount){
            hideAllButSelected.call(this, GroupNames[0], resource, portAmount);
		}
        
		/**
		 Disables all the resources that the player could give
		 @method hideGiveOptions
		 */
		MaritimeView.prototype.hideGiveOptions = function(){
            hideAllButSelected.call(this, GroupNames[0]);
		}
		
		/**
		 Shows all the resources, enabling the ones the player can receive, and disabling the ones he can't.
		 @method showGetOptions
		 @param {Array} resources the resources a player can receive
		 */
		MaritimeView.prototype.showGetOptions = function(resources){
            showAll.call(this, GroupNames[1], resources);
		}
        
		/**
		 Hides all the resources except the one the player has selected.
		 @method selectGetOption
		 @param {String} resource the resource the player has selected to receive (a resource: "wood","brick","sheep","wheat","ore")
		 @param {int} the amount the player has to receive of the selected resource
		 */
		MaritimeView.prototype.selectGetOption = function(resource, portAmount){
            hideAllButSelected.call(this, GroupNames[1], resource, portAmount);
		}
        
		/**
		 Disables all the resources that the player could receive
		 @method hideGetOptions
		 */
		MaritimeView.prototype.hideGetOptions = function(){
           hideAllButSelected.call(this, GroupNames[1]);
		}
		
		/**
		 Enables or disables the button
		 @method enableTradeButton
		 @param {Boolean} enable whether to enable the button or not
		 */
		MaritimeView.prototype.enableTradeButton = function(enable){
			if(enable)
				this.getTradeButton().enable();
            else
				this.getTradeButton().disable();
		}
        
		/**
		 Sets the message on the button
		 @method setMessage
		 @param {String} message the message to display
		 */
		MaritimeView.prototype.setMessage = function(message){
			this.getTradeButton().setMessage(message);
		}
		
        //construct the view
		var buildView = function(){
			var parent = document.getElementById(Definitions.PageViewIDs.maritimeArea);

			var mainDiv = document.createElement("div");
				mainDiv.setAttribute("class","trade-display");
				
			for(index in GroupNames){
				mainDiv.appendChild(buildGroupDisplay.call(this, GroupNames[index]));
			}
			var buttonAction = core.makeAnonymousAction(this.getController(), this.getController().makeTrade);
			var button = new DisplayElement.ButtonArea(buttonAction);
				this.setTradeButton(button);
				mainDiv.appendChild(button.getView());
				
			parent.appendChild(mainDiv);
		};

        /* prepare everything to display, get actions and resource types to use.*/
		var buildGroupDisplay = function(groupName){
			
			var groupDiv = document.createElement("div");
				groupDiv.setAttribute("class","maritime-resource-display-area");
					
			var undoAction = core.makeAnonymousAction(this, this.undo, [groupName]);
			var undoDisplayElem = new DisplayElement.ComboElement(groupName, UNDO, undoAction);
			this.getUndoElems()[groupName] = undoDisplayElem;
				groupDiv.appendChild(undoDisplayElem.getView());
					
			for(resourceIndex in ResourceTypes){
				var value = ResourceTypes[resourceIndex];
			
				var action = core.makeAnonymousAction(this, this.chooseDisplayElem, [groupName, value]);
				var displayElem = new DisplayElement.ComboElement(groupName, value, action);
					groupDiv.appendChild(displayElem.getView());
				
				this.getResourceElems()[groupName] = this.getResourceElems()[groupName] || {};
				this.getResourceElems()[groupName][value] = displayElem;
			}
			return groupDiv;
		};
                
        //private, but in order to wrap, need to be on prototype
		MaritimeView.prototype.chooseDisplayElem = function(groupName, value){
			if(groupName == GroupNames[0])
				this.getController().setGiveValue(value);
			if(groupName == GroupNames[1])
				this.getController().setGetValue(value);
		}
		
		//private, but in order to wrap, need to be on prototype
		MaritimeView.prototype.undo = function(groupName){
			if(groupName == GroupNames[0])
				this.getController().unsetGiveValue();
			if(groupName == GroupNames[1])
				this.getController().unsetGetValue();
		}
                
        /*displays all the options to choose from, and sets the message if you can't trade. */
		var showAll = function(groupName, resources){
			if(groupName == undefined)	return;
			
			this.getUndoElems()[groupName].hide();
			for(index in ResourceTypes){
				var elem = this.getResourceElems()[groupName][ResourceTypes[index]];
					elem.enable();
				if(resources.indexOf(ResourceTypes[index]) < 0)
					elem.disable(KEEP_VISIBLE);
			}
		}
                
        /*enables the undo button*/
		var hideAllButSelected = function(groupName, resourceValue, portAmount){
			if(resourceValue != undefined){
				this.getUndoElems()[groupName].show();
				this.getUndoElems()[groupName].updateLabel(portAmount);
			}
			else
				this.getUndoElems()[groupName].hide();
			
			for(index in ResourceTypes){
				var keepVisible = false;
				
				if(ResourceTypes[index] == resourceValue)
					keepVisible = true;
				
				this.getResourceElems()[groupName][ResourceTypes[index]].disable(keepVisible);
			}
		}
        
		return MaritimeView;
	}());
        
	return MaritimeView;
}());

