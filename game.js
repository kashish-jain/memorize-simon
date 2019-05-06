var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function newSequence() {
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(200).fadeIn(500);

  playSound(randomChosenColour);
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 300);
}

$(document).keypress(function(){
  if(started == false){
    $("#level-title").text("Level 0");
    started = true;
    newSequence();

}
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("right");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function() {
        newSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("h1").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    startOver();
  }, 2000);

  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
  $("h1").text("Press A Key to Start");
}
