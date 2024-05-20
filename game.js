var buttonArray = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(){
    if (!started){
        $("#Level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userChosenColore = $(this).attr("id");
    userClickedPattern.push(userChosenColore);
    playSound(userChosenColore);
    animatePress(userChosenColore);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
        if (userClickedPattern.length === gamePattern.concat.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        $("#Level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function nextSequence(){
    level++;
    $("#Level-title").text("Level" + level);
    var randomNuber = Math.floor(Math.random() * 4);
    var randomChosenColore = buttonArray[nextSequence()];
    gamePattern.push(randomChosenColore);
    $("#"+randomChosenColore).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColore);
}

function animatePress(currentColore){
    $("#"+currentColore).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColore).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3")
    sound.play(); 
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}