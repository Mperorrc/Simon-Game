
var colors=["red","blue","green","yellow"];
var gamePattern=[];
var clickedPattern=[];
var level=0;
var keyp=true;
var clickcnt=0;

$(document).keypress(function(){
    if(keyp){
        keyp=false;
        nextsequence();
        clickcnt=0;
    }
});    

$('.btn').click(function() {
    var userColour=$(this).attr("id");
    sound(userColour);
    animatePress(userColour);
    if(gamePattern.length>0){
        clickedPattern.push(userColour);
        gameLogic();
        clickcnt++;
    }
    console.log(clickcnt,gamePattern.length);
    if(clickcnt==gamePattern.length&&gamePattern.length>0){
        setTimeout(nextsequence,1000);
        clickedPattern=[];
        clickcnt=0;
    }
});

function gameLogic(){
    if(gamePattern[clickcnt]!=clickedPattern[clickcnt]){
        $("#level-title").text("Game Over, Press any key to restart");
        setTimeout(function(){
            $("#body").addClass("game-over").removeClass("game-over");
        },200);
        var endAudio=new Audio("sounds/wrong.mp3");
        endAudio.play();
        gamePattern=[];
        clickedPattern=[];
        keyp=true;
        level=0;
    }
}

function nextsequence(){
    var randomNumber=Math.floor(4*Math.random());
    var randomColor=colors[randomNumber];
    gamePattern.push(randomColor);
    level++;
    $("#level-title").text("Level " + level);
    $('#'+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(randomColor);
    animatePress(randomColor);
}

function sound(color){
    var buttonAudio= new Audio("sounds/"+color+".mp3");
    buttonAudio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).addClass("pressed").removeClass("pressed");
    },100);
}