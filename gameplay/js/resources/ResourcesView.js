var catan = catan || {};
catan.resources = catan.resources|| {};

/**
    This is the namespace for resources
    @module catan.resources
    @namespace resources
*/

catan.resources.View = function resources_namespace() {
	var Definitions = catan.definitions;
	var DisplayElement = catan.definitions.DisplayElement;
	
	var SHOW_MOUSEOVER = true;
	var ACTION_GROUP = Definitions.GroupNames.resourceAction;
	var HOVER_GROUP = ACTION_GROUP;
	var DISPLAY_GROUP = Definitions.GroupNames.resourceDisplay;
	var OVERLAY_GROUP = Definitions.GroupNames.resourceOverlay;
	var BUY_CARD = Definitions.BUY_CARD;
	var VIEW_CARD = Definitions.VIEW_CARD;
	
	var ResourceBarView = (function ResourceBarView_Class(){
		
		/**
		 * View to display client player's current resources: 
		 * 	Resources (wood, sheep, ore, brick, wheat) and 
		 * 	Buyable Options (houses, roads, cities). 
		 * It also includes:
		 * 	Option to buy a Development card
		 *  Option to play a Development card
		 * 	The number of armies the player has used
         * It calls the following controller methods: "buildRoad", "buildSettlement", "buildCity", "buyCard", "playCard"
		 * @class ResourceBarView 
		 * @constructor
		**/
		var ResourceBarView = function() {
			this.setDisplayElems(new Array());
			this.setDisplayValues(new Array());
		};
        
		core.defineProperty(ResourceBarView.prototype, "controller");
		core.defineProperty(ResourceBarView.prototype, "DisplayElems");
		core.defineProperty(ResourceBarView.prototype, "DisplayValues");
		
		/**
		 * Attaches the controller to the view and builds the view on the page.
		 @method setController
		 @param {ResourceController} controller the controller
		 @return void
		 */		
		ResourceBarView.prototype.setController = function(controller){
			this.controller = controller;
			buildView.call(this);
 		}
		
		/**
		 * Updates the display for an element of the resource bar
		 * @method updateAmount
		 * @param {String} value	the element to change ("wood","brick","sheep","wheat","ore","Roads","Settlements","Cities","BuyCard","DevCards","Soldiers"). These constants are defined in StudentDefinitions.js
		 * @param {int} amount		the display amount (can be undefined)
		 * @return void
		 */
		ResourceBarView.prototype.updateAmount = function(value, amount){
			var elemNum = this.getDisplayValues().indexOf(value);
			if(elemNum != -1)
				this.getDisplayElems()[elemNum].updateLabel(amount);
		}
		
		/**
		 * Enables or disables an element of the resource bar
		 * @method setActionEnabled
		 * @param {String} value	the element to change ("wood","brick","sheep","wheat","ore","Roads","Settlements","Cities","BuyCard","DevCards","Soldiers"). These constants are defined in StudentDefinitions.js
		 * @param {Boolean} enabled		whether to enable the button
		 * @return void
		 */
		ResourceBarView.prototype.setActionEnabled = function(value, enabled){
			var elemNum = this.getDisplayValues().indexOf(value);
			if (elemNum != -1){
				if (enabled)
					this.getDisplayElems()[elemNum].enable(SHOW_MOUSEOVER);
				else
					this.getDisplayElems()[elemNum].disable(SHOW_MOUSEOVER);
			}
		}
		
		var buildView = function() {
			var parentArea = document.getElementById(Definitions.PageViewIDs.resourceArea);
			
			var mainDiv = document.createElement("div");
				mainDiv.setAttribute('id',"resource-bar");
			
			var displayPairs = getAllValues.call(this);
			for(index in displayPairs){
				var groupName = displayPairs[index].groupName;
				var value = displayPairs[index].value;
				var action = displayPairs[index].action;
				
				var displayElem = new DisplayElement.ComboElement(groupName, value, action);
				mainDiv.appendChild(displayElem.getView());
				displayElem.updateLabel(undefined);
				
				if(Definitions.BuyableTypes.indexOf(value) > -1){
						displayElem.setMouseIn(getMouseInAction.call(this,value));
						displayElem.setMouseOut(getMouseOutAction.call(this,value));
				}
				this.getDisplayElems().push(displayElem);
				this.getDisplayValues().push(value);
			}
			parentArea.appendChild(mainDiv);
		};
		
		var getAllValues = function (resource){
			var groupValuePairs = new Array();
			
			var resourceTypes = Definitions.ResourceTypes;
				var resourceGroup = DISPLAY_GROUP;
				makePairs.call(this,groupValuePairs, resourceGroup, resourceTypes);
			
			var buyableTypes = Definitions.BuyableTypes;
				var buyableGroup = ACTION_GROUP;
				makeActionPairs.call(this,groupValuePairs);
						
			return groupValuePairs;	
		};
		
		var makePairs = function(pairArray, groupName, groupArray){
			for(index in groupArray){
				pairArray.push({
					groupName:groupName,
					value:groupArray[index]
				});
			}
		}
		
		var makeActionPairs = function(pairArray){
			
			var ctrl = this.getController();
			pairArray.push({
					groupName:ACTION_GROUP,
					value:Definitions.ROAD,
					action:core.makeAnonymousAction(ctrl, ctrl.buildRoad)
				});
			pairArray.push({
					groupName:ACTION_GROUP,
					value:Definitions.SETTLEMENT,
					action:core.makeAnonymousAction(ctrl, ctrl.buildSettlement)
				});
			pairArray.push({
					groupName:ACTION_GROUP,
					value:Definitions.CITY,
					action:core.makeAnonymousAction(ctrl, ctrl.buildCity)
				});
			pairArray.push({
					groupName:ACTION_GROUP,
					value:Definitions.BUY_CARD,
					action:core.makeAnonymousAction(ctrl, ctrl.buyCard)
				});
			pairArray.push({
					groupName:ACTION_GROUP,
					value:Definitions.PLAY_CARD,
					action:core.makeAnonymousAction(ctrl, ctrl.playCard)
				});
			pairArray.push({
					groupName:DISPLAY_GROUP,
					value:Definitions.ARMY
				});
		}
		
		var getMouseInAction = function(value) {
			
				return function(){
					var costDisplay = document.getElementById(value + "-cost");
					costDisplay.setAttribute("style","visibility:visible;");
				};
		};
		var getMouseOutAction = function(value) {
			
				return function(){
					var costDisplay = document.getElementById(value+ "-cost");
					costDisplay.setAttribute("style","visibility:hidden;");
				};
                
		};
		
		return ResourceBarView;
	}());
    
	return ResourceBarView;
}();

