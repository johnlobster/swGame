// Javascript to implement Star Wars Game
// John Webster

$(document).ready(function(){

// object containing data values for fighting

var fightObj = {
    luke: { 
        healthPoints: 150, 
        originalHealthPoints: 150,
        attackPower : 10,
        attackPowerIncrementor: 4,
        originalAttackPower: 10,
        counterAttackPower: 10
    },
    obiwan: { 
        healthPoints: 150, 
        originalHealthPoints: 150,
        attackPower : 10,
        attackPowerIncrementor: 4,
        originalAttckPower: 10,
        counterAttackPower: 10
    },
    vader: { 
        healthPoints: 150, 
        originalHealthPoints: 150,
        attackPower : 10,
        attackPowerIncrementor: 4,
        originalAttackPower: 10,
        counterAttackPower: 10
    },
    maul: { 
        healthPoints: 150,
        originalHealthPoints: 150, 
        attackPower : 10,
        attackPowerIncrementor: 4,
        originalAttackPower: 10,
        counterAttackPower: 10
    }
}

// Global variables
var gameSelectionPhase = true;
var selectEnemyPhase = false;
var playGamePhase = false;
var fightPhase = false;

var gamesWon = 0;
var gamesLost = 0;

var heroSelected = "";
var enemySelected = "";
var enemiesDefeated = []; // holds list of enemies already defeated


// functions
function resetFightObj () {
    for (var i in fightObj) {
         if (fightObj.hasOwnProperty(i)) {   
            i.healthPoints = i.originalHealthPoints;
            i.attackPower = i.originalAttackPower;
        }
    }
}

resetFightObj();


// copy the cards and insert into hidden parts of the html, rather than duplicating html by hand
// add all into enemy and hero, will use visibility to select
$(".swGameCard").each( function(i, e){
    var enemyCard = $(e).clone();
    enemyCard.addClass("swEnemy");
    $("#enemies").append(enemyCard);
    var heroCard = $(e).clone();
    heroCard.addClass("swHero");
    $("#hero").append(heroCard);
    // copy to game playing html
    enemyCard = $(e).clone();
    enemyCard.addClass("swEnemyPlay");
    $("#enemyColumn").append(enemyCard);
    heroCard = $(e).clone();
    heroCard.addClass("swHeroPlay");
    $("#heroColumn").append(heroCard);
});

// event listener - look at all buttons, even if some not visible yet
$("button").on("click", function (){
    var cardSelected = this.id;
    console.log("Selected " + cardSelected + " " + typeof(cardSelected));
    // instructions button works without Javascript so ignore it
    if ( (cardSelected === "instructionsButton")  || 
        (cardSelected ==="closeInstructions1" ) || 
        (cardSelected ==="closeInstructions2" ) ) {
        return;
    }
    if ( gameSelectionPhase) {
        $(".swGameHeroSelect").each( function(i, e){
             // if ( $(e).attr("id") !== cardSelected) {
             
            //     $(e).animate( {opacity:0.8}, "slow");
            //     $(e).animate( {opacity:0.6}, "slow");
            //     $(e).animate( {opacity:0.4}, "slow");
            //     $(e).animate( {opacity:0.2}, "slow");
            //     // doesn't seem to wait for animations to complete
            // }
        });
        gameSelectionPhase = false;
        selectEnemyPhase = true;
        heroSelected = cardSelected;
        // hide gameSelection and show  selectEnemy
        $("#gameSelection").hide();
        $("#selectEnemy").show(); // display
        // Now hide the cards other than the hero card
        $(".swHero").each( function(i, e){
            // if ( $(e).attr("id") !== cardSelected) {
            //     $(e).hide();
            // }
            // else {
            //     $(e).show();
            // }
            $(e).hide();
        });
        $(".swEnemy").each( function(i, e){
            if ( $(e).attr("id") == cardSelected) {
                $(e).hide();
            }
            else {
                $(e).show();
            }
            
        });

    }
    else if (selectEnemyPhase) {
        enemySelected= cardSelected;
        $("#selectEnemy").hide(); 
        $("#gamePlay").show();
        selectEnemyPhase = false;
        playGamePhase = true;
        $("#nextEnemyButton").hide();
        // in the hero column, hide the unselected
        
        $(".swHeroPlay").each( function(i, e){
            //console.log( "Hero column " + typeof(e) + " " + e);
            if ( $(e).attr("id") !== heroSelected) {
               $(e).hide();
            }
            else {
                $(e).show();
            }
            
       });
       // in the enemy column, show only the enemy
       $(".swEnemyPlay").each( function(i, e){
            if (( $(e).attr("id") === enemySelected) ) {
                // console.log("Enemies - show " + $(e).attr("id"));
                $(e).show();
            }
            else {
                // console.log("Enemies - hide " + $(e).attr("id"));
                $(e).hide();
            }
        });
   
    } else if (playGamePhase) {
        if ( cardSelected === "nextEnemyButton") {
            playGamePhase = false;
            selectEnemyPhase = true;
            $("#gamePlay").hide();
            $("#selectEnemy").show();
            $("#fightText").text("");
            $(".swHero").each( function(i, e){
                // if ( $(e).attr("id") !== cardSelected) {
                //     $(e).hide();
                // }
                // else {
                //     $(e).show();
                // }
                $(e).hide();
            });
            $(".swEnemy").each( function(i, e){
                if (( $(e).attr("id") == heroSelected) || ( enemiesDefeated.indexOf( $(e).attr("id")) > -1 )) {
                    $(e).hide();
                }
                else {
                    $(e).show();
                }
                
            });
        }
        else if( cardSelected === "fightButton") {
            // hide the start again button and nextEnemy button
            $("#startAgainButton").show();
            $("#nextEnemyButton").hide();
            // fight calculations
            fightObj[heroSelected].healthPoints -= fightObj[enemySelected].counterAttackPower;
            fightObj[enemySelected].healthPoints -= fightObj[heroSelected].attackPower;
            fightObj[heroSelected].attackPower += fightObj[heroSelected].attackPowerIncrementor;
            // update text
            $("#fightText").empty();
            $("#fightText").text( "You attacked " + enemySelected + " causing " + 
                fightObj[heroSelected].attackPower+ " damage. "+ enemySelected + " attacked you causing " +
                fightObj[enemySelected].counterAttackPower + " damage.");
            // determine win/lose
            if (fightObj[heroSelected].healthPoints < 0 ) {
                // hero is defeated
                gamesLost += 1;
                $("#fightText").append( "You died !!  <br> Games won " + gamesWon + "<br> Games lost " + gamesLost);
                $("#startAgainButton").show();
            }
            else if (fightObj[enemySelected].healthPoints < 0) {
                // enemy defeated, move on to next one, or maybe all enemies defeated
                $("#fightText").empty();
                $("#fightText").text( "You defeated " + enemySelected + " !!");
                enemiesDefeated.push( enemySelected);
                // need to check to see whether all enemies have been beaten
                if ( enemiesDefeated.length > 2) {
                    gamesWon ++;
                    $("#fightText").append( "<br>You defeated all your enemies !! <br> Games won " + gamesWon + "<br> Games lost " + gamesLost);
                    $("#startAgainButton").show();
                    $("#nextEnemyButton").hide();
                }
                else {
                    $("#nextEnemyButton").show();
                }
            }
            // update displays
            // hit points on cards
            var jqueryString = "#" + heroSelected + ".swHeroPlay";
            $(jqueryString).find( "p").empty();
            $(jqueryString).find( "p").text("HP: "+fightObj[heroSelected].healthPoints);
            jqueryString = "#" + enemySelected + ".swEnemyPlay";
            $(jqueryString).find( "p").empty();
            $(jqueryString).find( "p").text("HP: "+fightObj[enemySelected].healthPoints);
            
            
        } else if ( cardSelected === "restartButton") {
            // reset all values 

            resetFightObj();
            $("#gamePlay").hide();
            $("#gameSelection").show();
            enemiesDefeated = [];
            gameSelectionPhase = true;
            selectEnemyPhase = false;
            playGamePhase = false;
            fightPhase - false;
        }
    }

    
});




});