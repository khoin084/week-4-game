/*Might be violation to use thise global variables (bad practice), 
but way too tired, so i'm gonna use it.
Globals used to track number of defeated enemies.*/
var enemiesTakenDown = 0;

/*************************************
* STAR WARDS OBJECT
**************************************/ 
var swGame = {
    yourCharacter: null,
    defenderCharacter: null,
    selectedCharacter: false,
    selectedDefenderCharacter: false,
    jedi:[
    {
    name:"obi",
    healthPoints: 180, 
    attackPower: 4, 
    counterAttackPower: 50,
    status: false,
    },
    {
    name:"luke",
    healthPoints: 220, 
    attackPower: 5, 
    counterAttackPower: 30,
    status: false
    },
    {
    name:"vader",
    healthPoints: 280, 
    attackPower: 10, 
    counterAttackPower: 40,
    status: false,
    },
    {
    name:"sidious",
    healthPoints: 300, 
    attackPower: 7, 
    counterAttackPower: 14,
    status: false
    }],
  
    yourCharacterSelection: function(strName) {
      for(var i = 0; i < this.jedi.length; i++) {
        if(this.jedi[i].name === strName) {
          this.yourCharacter = this.jedi[i];
          this.jedi[i].status = true; 
        }
      }
      swGame.selectedCharacter = true;
      $("#chosenChar").html("<span class='blue'><b>Your Character</b></span>");
    },//end of yourCharacterSelection method
    yourDefenderCharacterSelection: function(strName) {
      	for(var i = 0; i < swGame.jedi.length; i++) {
        	if(strName === this.jedi[i].name && this.selectedDefenderCharacter === false) {
          		this.defenderCharacter = this.jedi[i];
          		this.defenderCharacter.status = true;
          		var tempStr = "#" + this.jedi[i].name;
          		var tempObj = $(tempStr).detach();
          		tempObj.appendTo($("#enemy"));
          		tempObj.addClass("btn-danger");
          		this.selectedDefenderCharacter = true;
        	}
      	}
    },//end of yourDefenerCharacterSelection method
    displayAttackLog: function (hero, enemy) {
    	
    	if(this.selectedCharacter && this.selectedDefenderCharacter) { 
       		this.yourCharacter.healthPoints -= this.defenderCharacter.counterAttackPower;
       		this.defenderCharacter.healthPoints -= this.yourCharacter.attackPower;
       		$("#your-attack").html(this.yourCharacter.attackPower);
       		$("#your-name").html(this.defenderCharacter.name);
       		$("#enemy-name").html(this.defenderCharacter.name);
       		$("#enemy-attack").html(this.defenderCharacter.counterAttackPower);
       		$(enemy).find(".hp").html(this.defenderCharacter.healthPoints);
       		$(hero).find(".hp").html(this.yourCharacter.healthPoints);
  			$("#defeatedJedi").hide();
       		$("#firstLog").show();
    		$("#secondLog").show();
    		this.yourCharacter.attackPower += this.yourCharacter.attackPower;
     		if(this.yourCharacter.healthPoints < 0) {
     			$("#firstLog").hide();
  				$("#secondLog").hide();
  				$("#gameOverLog").show();
  				$("#restartPrompt").show();
  				this.resetGame();
     		}
       		else if(this.defenderCharacter.healthPoints < 0) {
         		$(enemy).hide();
         		$("#defeatedJedi").show();
         		$("#defeated-enemy-name").html(this.defenderCharacter.name);
         		$("#firstLog").hide();
  				$("#secondLog").hide();
         		this.selectedDefenderCharacter = false;
         		enemiesTakenDown++;
       		}
       		else {console.log("*");}		
       	}
       	else {
       		alert("Please select your characters before attacking.");
     	}     	
     	console.log("*******" + enemiesTakenDown);
     	if(enemiesTakenDown === 3) {
     		$("#defeatedJedi").hide();
     		$("#gameOverLog").hide();
     		$("#wonLog").show();
     		$("#firstLog").hide();
  			$("#secondLog").hide();
  			$("#restartPrompt").show();
     		this.resetGame();
     		enemiesTakenDown = 0;
     	}
    },//end of displayAttackLog method
    resetGame: function () {
      	this.jedi[0].healthPoints = 180;
        this.jedi[0].attackPower = 4;
      	this.jedi[0].status = false;
      	this.jedi[1].healthPoints = 220;
        this.jedi[1].attackPower = 5;
      	this.jedi[1].status = false;
      	this.jedi[2].healthPoints = 280;
        this.jedi[2].attackPower = 6;
      	this.jedi[2].status = false;
      	this.jedi[3].healthPoints = 320;
        this.jedi[3].attackPower = 7;
      	this.jedi[3].status = false;
      	this.selectedCharacter = false;
      	this.selectedDefenderCharacter = false;
      	this.yourCharacter = null;
      	this.defenderCharacter = null;
        enemiesTakenDown = 0;
        $("#chosenChar").html("<span>Available Characters for Selection</span>");
      	for(var i = 0; i < this.jedi.length; i++) {
        	var tempReset = "#" + this.jedi[i].name;
           	$(tempReset).find(".hp").html(this.jedi[i].healthPoints);
           	var tempObj = $(tempReset).detach();
           	tempObj.appendTo("#availableChoices");
           	//this step was super tricky, needed to get rid of old btn class color before adding new one.
           	tempObj.removeClass("btn-danger").addClass("btn-success");
           	tempObj.show();
       	}     
    }//end of resetGame method
}
//jquery method executes when DOM has been fully loaded.
$( document ).ready(function() {
  $("#wonLog").hide();
  $("#gameOverLog").hide();
  $("#defeatedJedi").hide();
  $("#firstLog").hide();
  $("#secondLog").hide();
  $("#restartPrompt").hide();
  //listener for Character Buttons
  $( ".character" ).click(function() {
    console.log("******" + swGame.selectedCharacter);
    //$(this).find(".hp").html(0);
    if(swGame.selectedCharacter === false) {
      	swGame.yourCharacterSelection($(this).val());
      	for(var i = 0; i < swGame.jedi.length; i++) {
        	if(swGame.jedi[i].status === false) {
          		var tempStr = "#" + swGame.jedi[i].name;
          		var tempObj = $(tempStr).detach();
          		tempObj.appendTo($("#enemyAvailable"));
          		tempObj.addClass("btn-danger");
        }   
      }
    }
    else if(swGame.selectedDefenderCharacter === false) {
      	if($(this).val() === swGame.yourCharacter.name) {
      		alert("You have already chosen your Character");
      	}
      	else {
      		swGame.yourDefenderCharacterSelection($(this).val());
      	}
    }
    else {
      	alert("Please finish current fight before selecting additional characters.");
    }
  });//end of character button listener
  //listener for Attack Button
  $( ".attackBtn" ).click(function() {
  	if(swGame.yourCharacter === null || swGame.defenderCharacter === null) {
  		alert("Please finish selecting your players.");
  	}//passing strings to display attack comments.   
  	else {
  		var str1 = "#" + swGame.yourCharacter.name;
    	var str2 = "#" + swGame.defenderCharacter.name;
    	swGame.displayAttackLog(str1, str2); 
    } 
  });//end of attack button listener
  //listener for Restart Button
  $( ".restartBtn" ).click(function() {
  	console.log("did ou go in hur?");
  	swGame.resetGame(); 
  	$("#wonLog").hide();
  	$("#gameOverLog").hide();
  	$("#defeatedJedi").hide();
  	$("#firstLog").hide();
  	$("#secondLog").hide();
  	$("#restartPrompt").hide();
  	$("#defeatedJedi").hide();

  });//end of restart button listener  
});//end of ready function.