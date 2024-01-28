var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

function animatePress(pressedColor){
    $("#"+pressedColor).addClass("pressed");
    setTimeout(function(){
        $("#"+pressedColor).removeClass("pressed");
    },100);
}
function nextSequence(){
    var rand=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[rand];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).fadeOut().fadeIn();
    new Audio("./sounds/"+randomChosenColor+".mp3").play();
    level++;
    $("#level-title").text("Level "+level);
}

function checkAnswer(currentIndex){
    if(userClickedPattern[currentIndex]===gamePattern[currentIndex]){
        console.log("Success");
    }
    else{
        startOver();
        console.log("Failure");
        new Audio("./sounds/wrong.mp3").play();
        $("#level-title").text("Gameover. Press any key to restart.");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
    }
}
$(".btn").click(function(){
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    new Audio("./sounds/"+userChosenColor+".mp3").play();
    checkAnswer(userClickedPattern.length-1);
    if(userClickedPattern.length===gamePattern.length){
        userClickedPattern=[];
        setTimeout(nextSequence,1000);
    }
});

$("body").keypress(function(event){
    started=true;
    nextSequence();
    $("#level-title").text("Level "+level);
});

function startOver(){
    level=0;
    gamePattern=[];
     userClickedPattern=[];
    started=false;
}