// Javascript to implement Star Wars Game
// John Webster

$(document).ready(function(){
// set up Instructions button - it's a bootstrap "modal"

// Global variables
gameSelectionPhase = true;
selectEnemyPhase = false;
playGamePhase = false;

gamesWon = 0;
gamesLost = 0;

heroSelected = "";
enemySelected = "";


// Select the hero (visible by default)




// copy the cards and insert into hidden parts of the html
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

// event listener - look at all buttons
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
        $(".swGameCard").each( function(i, e){
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
        $(".swHeroPlay").each( function(i, e){
             if ( $(e).attr("id") !== cardSelected) {
                $(e).hide();
            }
        });
        $(".swEnemyPlay").each( function(i, e){
             if ( $(e).attr("id") == cardSelected) {
                $(e).hide();
            }
            
        });

    }
    else if (selectEnemyPhase) {
        enemySelected= cardSelected;
        $("#selectEnemy").hide(); 
        $("#gamePlay").show();
        selectEnemyPhase = false;
        playGamePhase = true;
        // in the hero column, hide the unselected
        $(".swHeroColumn").each( function(i, e){
            console.log( "Hero column " + typeof(e) + " " + e);
            if ( e !== heroSelected) {
               $(e).hide();
           }
       });
       // in the enemy column, hide the
       $(".swHeroColumn").each( function(i, e){
            if ( e !== enemySelected) {
                $(e).hide();
            }
        });
   
    }

    
});


// $(".swGameCard,#playAgainButton").on("click", function(){
//     var cardSelected = this.id;
//     console.log("Selected " + cardSelected);
//     // run through all the game cards
//         // turn off these buttons so can't click twice
//         $(e).off("click"); 
        
        

//     });
//     // hide gameSelection as finished with it
//     $("#gameSelection").hide();
//     // now duplicate the remaining cards and attach them into the selectEnemy DIV
//     var heroCard = $(this).clone();
//     heroCard.addClass("swHero"); 
//     $("#hero").append(heroCard);
//     $("#selectEnemy").show(); // display
//     // add the enemy cards
//     $(".swGameCard").each( function(i, e){
//         // console.log( $(e).attr("id"));
//         if ( $(e).attr("id") !== cardSelected) {
//             var enemyCard = $(e).clone();
//             enemyCard.addClass("swEnemy");
//             $("#enemies").append(enemyCard);
//         }
//     });
    

//     // now set up event for clicking enemy cards 
//     $(".swEnemy").on("click", function() {
//         var cardSelected = this.id;
//         console.log("Enemy Selected " + cardSelected);
//         // run through all the game cards
//         $(".swGameCard").each( function(i, e){
//             // console.log( $(e).attr("id"));
//             if ( $(e).attr("id") !== cardSelected) {
         
//                 $(e).animate( {opacity:0.8}, "slow");
//                 $(e).animate( {opacity:0.6}, "slow");
//                 $(e).animate( {opacity:0.4}, "slow");
//                 $(e).animate( {opacity:0.2}, "slow");
//                 // doesn't seem to wait for animations to complete
//             }
//             // turn off these buttons so can't click twice
//             $(e).off("click"); 
//         } );
//         $("#selectEnemy").hide(); // finished Enemy selection
//         // set up fight cards
//         var enemyCard = $(this).clone();
//         enemyCard.addClass("enemyCard");
//         enemyCard.stop();
//         heroCard.stop();
//         enemyCard.css( "opacity", 1);
//         heroCard.css( "opacity", 1);

//         // build fighting screen
//         $("#heroColumn").append( heroCard);
//         $("#enemyColumn").append( enemyCard)

//         $("#gamePlay").show();
        
        
//     });

    
    


// });

});