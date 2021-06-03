/* We will declare some variables that we will use.*/
/* In JS all lines end with a semicolon. */
/* 3 different ways to initaialize a variable -> "let", "var", "const" . */
/* var applies to the scope of entire program */
/* let applies to the scope where it was declared/defined so has a limited scope */
/* const value cannot be changed */

let order = []; /* Declared an array named order. It will store the order of lights that how are they going to flash. */
let playerOrder = []; /* It will store the order that the player is pressing the lights in which order. */
let flash; /* It is an integer that stores the number of flashes appeared in a game. */
let turn; /* Keep track of what turn we are on */
let good; /* It stores boolean true or false and tells if the player has pressed all the right colors or not. */
let compTurn; /* It is boolean true or false. It tells wether it is computer turn or player turn. */
let intervalId;
let strict = false; /* It tells wether strict checkbox is clicked or not. Initially it is false.*/
let noise = true;
let on = false; /* If ON checkbox has been turned on or not. */
let win; /* If the player has won the game or not */

/* Here we will reference some of our html elements in our javascript. */
const turnCounter = document.querySelector("#turn"); /* We have passed here CSS selector (#turn) which tells that an html element with id "turn" is there at and it's value is stored in variable "turnCounter".*/
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

/* Now we will write the program in the order in which we will play the game. */
/* First we will interact with power button, start button and the strict button. */

/* I add event listener on strict checkbox and use arrow function and 
write all the code which takes place when value inside strict checkbox is changed or not.*/
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) { /* If checkbox is clicked then strict variable is made true. */
    strict = true;
  } else { /* If checkbox is not clicked then strict variable is made false. */
    strict = false;
  }
});

/* The console. log() is a function that writes a message to log on the debugging console, such as Webkit or Firebug. 
In a browser you will not see anything on the screen.
 It logs a message to a debugging console*/


 onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-"; /* inner html is used to change the html element. In the box of counter, a horizontal line appears by this. */ 
  } else {
    on = false;
    turnCounter.innerHTML = ""; 
    clearColor(); /* clearColor function is called in which all the light colors will change to dark color when on button is turned off.*/
    clearInterval(intervalId);  //  Stop the gameturn function to flash colors.
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) { /* If on==true or win==true then call the play function */
    play();
  }
});

/* This is how we define a function in JS*/
function play() {
  /* All variables will be reset if the person plays again */
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1; /* Now 1 appers on box of turn */
  good = true;
  for (var i = 0; i < 20; i++) {  // Before we win the game we have to do 20 rounds. So loop execute 20 times.
    order.push(Math.floor(Math.random() * 4) + 1); // Random numbers are generated b/w 1(inclusive) and 5(exclude) and sotored in order array.
  }   // Math.random() generate number b/w 0 and 1.
  compTurn = true;  // Game starts with computer flashing lights and player has to match the lights.
 
  intervalId = setInterval(gameTurn, 800);  // setInterval is run the game turn function every 800 ms.
}

function gameTurn() {
  on = false;  // While on is false, player cannot click on any color so that computer first flashes color.

  if (flash == turn) { // If number of times the light has flash equal to no. of turns then computer turn is over.
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true; // Player can start pressing colors.
  } 

  if (compTurn) {  // If it's computer turn.
    clearColor();
    setTimeout(() => { // setTimeout peforms the code written inside it once, after waiting for 200ms.
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {  
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 3 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}





