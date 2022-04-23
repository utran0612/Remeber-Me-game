// Global Constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1500; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var myTimeOut = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var numMistake;
var level = 0;  //which level of game is the user at
var levelUp = false;
var btnNum = 4;  //used to track current number of buttons 
var donePlaySequence = true; 

function startGame() {
  //initialize game variables
  pattern = getPattern();  //get pattern
  progress = 0;  //progress on notes playing
  guessCounter = 0; //set progess == 0 because user haven't done any guess
  gamePlaying = true;
  numMistake = 0; 
  clueHoldTime = 1000;
  level = 0;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  // Freeeze "more" and "less" buttons
  document.getElementById("moreBtn").disabled = true;
  document.getElementById("lessBtn").disabled = true;

  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  level = 0
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");

  document.getElementById("moreBtn").disabled = false;
  document.getElementById("lessBtn").disabled = false;

  stopTone();
  endCount();
}

// Dictionary of sounds
const soundDict = {
  1: "https://cdn.glitch.global/7acb477e-9bca-4ab4-ad73-661f0514ef13/guitar1.wav?v=1650073662376",
  2: "https://cdn.glitch.global/7acb477e-9bca-4ab4-ad73-661f0514ef13/mixkit-arcade-game-jump-coin-216.wav?v=1650073960754",
  3: "https://cdn.glitch.global/7acb477e-9bca-4ab4-ad73-661f0514ef13/mixkit-happy-guitar-chords-2319.wav?v=1650074258589",
  4: "https://cdn.glitch.global/7acb477e-9bca-4ab4-ad73-661f0514ef13/mixkit-arcade-bonus-alert-767.wav?v=1650074381619",
  5: "https://cdn.glitch.global/7acb477e-9bca-4ab4-ad73-661f0514ef13/mixkit-unlock-game-notification-253.wav?v=1650074696654",
  6: "https://cdn.glitch.global/7acb477e-9bca-4ab4-ad73-661f0514ef13/mixkit-cool-guitar-riff-2321.wav?v=1650074590174",
};

function playTone(btn, len) {
  playSound(btn);
  setTimeout(function () {
    stopTone();
  }, len);
}

function playSound(btn) {
  var sound = new Audio(soundDict[btn]);
  sound.play();
}


//Use these two functions in html for the buttons
function startTone(btn) {
  if (!tonePlaying) {
    playSound(btn);
    tonePlaying = true;
  }
}

function stopTone() {
  tonePlaying = false;
}

// Page Initialization

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function displayImg(btn) {
  document.getElementById("button" + btn).classList.add("hidden");
  document.getElementById("img" + btn).classList.remove("hidden");
}

function hideImg(btn) {
  document.getElementById("button" + btn).classList.remove("hidden");
  document.getElementById("img" + btn).classList.add("hidden");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn)
  }
}


// Display timer
let timeSecond = 30;
const timeH = document.getElementById("timer");

function displayTime(second) {
  timeH.innerHTML = `00:${timeSecond < 10 ? "0" : ""}${timeSecond}`;
}

//Show this when the timer haven't started or ended
function endCount() {
  timeH.innerHTML = "00:30";
}

/*Determine whether the timer should be playing or not*/
let det = false;

function playClueSequence(det) {
  //Update level
  
  level += 1;
  console.log(level)
  levelUp = true;
  levelUpNoti(level);
  //Play the sequence
  clueHoldTime = clueHoldTime - 70; //play it faster every round
  //context.resume();
  let delay = nextClueWaitTime; //set delay to initial wait time
  guessCounter = 0;
  
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
    
  }
  
  //Start the timer every sequence
  timeSecond = 31;
  const countDown = setInterval(() => {
    timeSecond--;
    displayTime(timeSecond);
    if (timeSecond < 0) {
      clearInterval(countDown);
      loseGame();
      endCount();
    } else if (det) {
      clearInterval(countDown);
    } else if (!gamePlaying) {
      clearInterval(countDown);
      timeH.innerHTML = "00:30";
    }
  }, 1000);
  levelUp = false;
  donePlaySequence = true;
  
  
}

//Alert when lose game
function loseGame() {
  //loseSound();
  stopGame();
  var timeoutID = setTimeout(alert("Game Over. You lost :("), 5000);
  //alert("Game Over. You lost :(");
}


function loseSound() {
  var audio = new Audio(
    "https://cdn.glitch.global/7acb477e-9bca-4ab4-ad73-661f0514ef13/mixkit-player-losing-or-failing-2042.wav?v=1650071427482"
  );
  audio.play();
}

//Alert when win game
function winGame() {
  stopGame();
  alert("Hurray! You won!");
}

//Count player's guesses
function guess(btn) {
  if (!gamePlaying) {
    return;
  }

  // add game logic here
  if (guessCounter < progress) {
    if (btn == pattern[guessCounter]) {
      guessCounter++;
    } else {
      // Increment mistake counts
      numMistake++;
      // Check if player crosses all 3 strikes, else show snackbar to notify them
      if (didLose(numMistake)) {
        loseGame();
      } else {
        notify(numMistake);
      }
    }
  } else if (guessCounter == progress) {
    if (btn == pattern[guessCounter]) {
      if (progress < pattern.length - 1) {
        progress++;
        det = true;
        playClueSequence(det);
      } else {
        guessCounter = 0;
        winGame();
      }
    } else {
      numMistake++;
      if (didLose(numMistake)) {
        loseGame();
      } else {
        notify(numMistake);
      }
    }
  } else {
    numMistake++;
    if (didLose(numMistake)) {
      loseGame();
    }
    notify(numMistake);
  }
}

//Get random pattern
function getPattern() {
  var p;
  pattern = [];

  let min = 1;
  let max = btnNum;

  for (let i = 0; i < btnNum * 2; i++) {
    p = Math.floor(Math.random() * (max - min + 1)) + min;
    pattern.push(p);
  }
  return pattern;
}

// Count mistakes and return whether player has lost the game.
function didLose(num) {
  if (num > 2) {
    return true;
  } else {
    return false;
  }
}

// Show snackbar whenever player makes a wrong guess
function notify(numMistake) {
  // Get the snackbar DIV
  var bar1 = document.getElementById("snackbar1");
  var bar2 = document.getElementById("snackbar2");
  // If mistake count = 1, show snackbar 1
  if (numMistake == 1) {
    bar1.className = "show"; // Add the "show" class to DIV
    setTimeout(function () {
      bar1.className = bar1.className.replace("show", "");
    }, 1000); // After 1 second, remove the show class from DIV
    // If mistake count = 2, show snackbar 2
  } else if (numMistake == 2) {
    bar2.className = "show";
    setTimeout(function () {
      bar2.className = bar2.className.replace("show", "");
    }, 1000);
  }
}

// Show user that they are up to a new level
function levelUpNoti(level) {
  var levelBar = document.getElementById("level");
  if (levelUp && level > 1) {
    levelBar.className = "show";
    setTimeout(function () {
      levelBar.className = levelBar.className.replace("show", "");
    }, 1000);
  }
}

// "Add" button to increase number of buttons
function onBtn() {
  if (btnNum == 4) {
    document.getElementById("button5").classList.remove("hidden");
    btnNum = 5;
  } else if (btnNum == 5) {
    document.getElementById("button6").classList.remove("hidden");
    btnNum = 6;
  }
}

// "Remove" button to decrease number of buttons
function offBtn() {
  if (btnNum == 5) {
    document.getElementById("button5").classList.add("hidden");
    btnNum = 4;
  } else if (btnNum == 6) {
    document.getElementById("button6").classList.add("hidden");
    btnNum = 5;
  }
}
/*
document.getElementById("button1").classList.add("no-click");
document.getElementById("button2").classList.add("no-click");
document.getElementById("button3").classList.add("no-click");
document.getElementById("button4").classList.add("no-click");
document.getElementById("button5").classList.add("no-click");
document.getElementById("button6").classList.add("no-click");

document.getElementById("button1").classList.remove("no-click");
document.getElementById("button2").classList.remove("no-click");
document.getElementById("button3").classList.remove("no-click");
document.getElementById("button4").classList.remove("no-click");
document.getElementById("button5").classList.remove("no-click");
document.getElementById("button6").classList.remove("no-click");
*/