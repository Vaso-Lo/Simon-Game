var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$(document).on("keydown", function () {

    if (!started) {

        $("#level-title").text("Level " + level);

        nextSequence();
        started = true;

        }

    });


function nextSequence () {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}


//Check users' answers
function checkAnswer (currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        
    }

}


//Start over
function startOver () {
    
    level = 0;
    started = false;
    gamePattern = [];

}


//Users' click 
$(".btn").on("click", function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length - 1); //Pass user's latest answer in check answer function

    playSound(userChosenColor);
    animatePress(userChosenColor);

});


//Play sound
function playSound (name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}


//Add animation
function animatePress (currentColor) {

    $("." + currentColor).addClass("pressed");

    setTimeout (function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);

}


