//Simple game based on Simon. It was originally part of my Udemy class
// but I wanted to add thing like my own ui and sounds and different functionality

//things I'd like to add
// a timeout to limit timeout
// use a cookie to store the max level so it won't reset when player comes back


//global variables
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var maxLevel = 0;

//functions
function nextSequence() {
  //clear the user array from previous level
  userClickedPattern = [];
  //raise level for next iteration
  level++;
  if(level > maxLevel){
    maxLevel = level;
    //update max Level
    $(".max-level").text("Max Level: " + maxLevel);
  }
  //select the next color in the sequence
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //change level on screen
  $("#level-title").text(`Level ${level}`);
  //play the sequence for the user to match
  setTimeout(() => {playSequence();},2000);

}

function playSound(sound) {
  //play the selected sound
  var buttonSound = new Audio("sounds/" + sound + ".mp3");
  buttonSound.play();
}

function animateKey(keyColor) {
  //animate the key when it is pressed or the pattern is being displayed for the player
  playSound(keyColor);
  $("#" + keyColor).addClass("bright-" + keyColor);
  setTimeout(function() {
    $("." + keyColor).removeClass("bright-" + keyColor);
  }, 400);
}

function playSequence() {
  //go through the game pattern and call animateKey which calls playSound
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(() => {
      animateKey(gamePattern[i]);
    }, i * 700);
  }
}

function checkAnswer(currentLevel) {
  //check the answer
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //if the answer is correct and it's the last item in the sequence, call next sequence
    if ((currentLevel + 1) === gamePattern.length) {
      nextSequence();
    }
    return true;
  } else {
    //if wrong let user know and restart game
    console.log("Fail");
    $(".keys").addClass("wrong");
    playSound("spongebob");
    setTimeout(() => {
      $(".keys").removeClass("wrong");
    }, 5000);
    $("#level-title").html("Game Over!<br> Click Here to Restart");
    startOver();
  }
  return false;
}

function startOver() {


  level = 0;
  gamePattern = [];
  gameStarted = false;

}

//clicking the button
//buttons active if game is game game started

$(".key").on("click", function(event) {
  if (gameStarted) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    if (checkAnswer(userClickedPattern.length - 1)) {
      animateKey(userChosenColor);
    }
  }
});

//start the game
$("#level-title").click(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});
