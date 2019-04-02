// Javascript to implement Star Wars Game
// John Webster

$(document).ready(function(){
// set up Instructions button - it's a bootstrap "modal"

// Global variables
gameSelectionFinished = false;
selectEnemyFinished = false;

gamesWon = 0;
gamesLost = 0;

// Select the hero (visible by default)


$(".swGameCard").on("click", function(){
    var cardSelected = this.id;
    console.log("Selected " + cardSelected);
    // run through all the game cards
    $(".swGameCard").each( function(i, e){
        // console.log( $(e).attr("id"));
        if ( $(e).attr("id") !== cardSelected) {
         
            $(e).animate( {opacity:0.8}, "slow");
            $(e).animate( {opacity:0.6}, "slow");
            $(e).animate( {opacity:0.4}, "slow");
            $(e).animate( {opacity:0.2}, "slow");
            // doesn't seem to wait for animations to complete
        } 
        // turn off these buttons so can't click twice
        $(e).off("click"); 
        
        

    });
    // hide gameSelection as finished with it
    $("#gameSelection").hide();
    // now duplicate the remaining cards and attach them into the selectEnemy DIV
    var heroCard = $(this).clone();
    heroCard.addClass("swHero"); 
    $("#hero").append(heroCard);
    $("#selectEnemy").show(); // display
    // add the enemy cards
    $(".swGameCard").each( function(i, e){
        // console.log( $(e).attr("id"));
        if ( $(e).attr("id") !== cardSelected) {
            var enemyCard = $(e).clone();
            enemyCard.addClass("swEnemy");
            $("#enemies").append(enemyCard);
        }
    });
    

    // now set up event for clicking enemy cards 
    $(".swEnemy").on("click", function() {
        var cardSelected = this.id;
        console.log("Enemy Selected " + cardSelected);
        // run through all the game cards
        $(".swGameCard").each( function(i, e){
            // console.log( $(e).attr("id"));
            if ( $(e).attr("id") !== cardSelected) {
         
                $(e).animate( {opacity:0.8}, "slow");
                $(e).animate( {opacity:0.6}, "slow");
                $(e).animate( {opacity:0.4}, "slow");
                $(e).animate( {opacity:0.2}, "slow");
                // doesn't seem to wait for animations to complete
            }
            // turn off these buttons so can't click twice
            $(e).off("click"); 
        } );
        $("#selectEnemy").hide(); // finished Enemy selection
        // set up fight cards
        var enemyCard = $(this).clone();
        enemyCard.addClass("enemyCard");
        enemyCard.stop();
        heroCard.stop();
        enemyCard.css( "opacity", 1);
        heroCard.css( "opacity", 1);

        // build fighting screen
        $("#heroColumn").append( heroCard);
        $("#enemyColumn").append( enemyCard)

        $("#gamePlay").show();
        
        
    });

    
    


});

});