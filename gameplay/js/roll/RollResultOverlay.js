var catan = catan || {};
catan.roll = catan.roll ||{};

/**
    This is the namespace the rolling interface
    @module catan.roll
    @namespace roll
*/

catan.roll.ResultOverlay = (function roll_namespace(){

	var StaticImage = catan.definitions.DisplayElement.BasicElements.StaticImage;	
        
    var BasicOverlay = catan.misc.BasicOverlay;
    var BUTTON_STYLE = "button-area three-quarter short";
    var DisplayElement = catan.definitions.DisplayElement;
     
    var RollResultView = (function(){
                
        core.forceClassInherit(RollResultView,BasicOverlay);
        
        /**
         * A view for displaying the result of a roll.  It inherits from misc.BaseOverlay.
         * It calls the "closeResult" method on its controller when the user clicks the "Okay" button.
         * @class RollResultView
         * @constructor
         * @extends misc.BaseOverlay
         */
        function RollResultView(title){
            title = title || "Roll Result";
            BasicOverlay.call(this,title);            
        };
        
        core.defineProperty(RollResultView.prototype, "amount");
        core.defineProperty(RollResultView.prototype, "amountDisplay");

        /**
         * sets the amount to display after a roll.
         * @method setAmount
         * @param {int} amount the amount to display
         * @return void
         */
        RollResultView.prototype.setAmount = function(amount){
            this.amount = amount;
            this.getAmountDisplay().innerHTML = "<b>You rolled a " + amount + "<b>";
        };

        RollResultView.prototype.generateBody = function(){
            var divContainer = document.createElement("div");
            divContainer.setAttribute("class","text-center");
            
            var msg = document.createElement("label");
            msg.innerHTML= "<b>You rolled a " + this.getAmount() + "<b>";
            this.setAmountDisplay(msg);
            
            var img = new StaticImage("resources", "overlay-image");				
            
            divContainer.appendChild(img);
            divContainer.appendChild(msg);
 
            return divContainer;
        };
        
        RollResultView.prototype.generateFooter = function(){
            
            var action = core.makeAnonymousAction(this,this.doAction);
            var rollButton = new DisplayElement.ButtonArea(action);
                rollButton.setStyle(BUTTON_STYLE);
                        rollButton.setMessage("Okay");
            var topDiv = document.createElement("div");
                topDiv.appendChild(rollButton.getView());
            return topDiv;
        }
        
        RollResultView.prototype.doAction = function(){
            this.getController().closeResult();
        }
       
        return RollResultView;
    }());
    
    return RollResultView;
}());

