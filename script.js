//Array of words
const words = [
    "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

//making a copy because we need the original one for the restart
let wordsCopy = words.map((x) => x);

//Setting levels
const levels = {
    "easy" : 6,
    "medium" : 4,
    "hard" : 2
};

//default level
let defaultLevelName = "hard"; //change level from here
let defaultLevelSeconds = levels[defaultLevelName];

// Catch selectors
let gameContainer = document.querySelector(".container");
let levelNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".seconds");
let startButton = document.querySelector(".start");
let restartButton = document.querySelector(".restart");
let quitButton = document.querySelector(".quit");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMsg = document.querySelector(".finish");

//setting level name + seconds + score
levelNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

//disable copy paste event
input.onpaste = function() {
    return false;
};

//start game
startButton.addEventListener("click", function() {
    //delete start button
    this.remove();
    input.value = "";
    input.focus();
    //generate word function
    genWords();
});
//restart game
restartButton.addEventListener("click", function() {
    //hide restart button
    this.classList.add("inactive");
    //enable input
    enable();
    input.value = "";
    input.focus();
    //reset score
    scoreGot.innerHTML = "0";
    //remove game over msg
    let gameOver = document.querySelector(".bad");
    gameOver.remove();
    //reset words 
    wordsCopy = words.map((x) => x);
    //generate word function
    genWords();
});
//quit game
quitButton.addEventListener("click", function() {
    //temporary solution
    location.reload();
});

function genWords() {
    //get random word from array
    let randomWord =  wordsCopy[Math.trunc(Math.random() * wordsCopy.length)];
    //get word index
    let wordIndex = wordsCopy.indexOf(randomWord);
    //delete word from array
    wordsCopy.splice(wordIndex,1);
    //show the random word
    theWord.innerHTML = randomWord;
    //empty upcoming words
    upcomingWords.innerHTML = "";
    //generate upcoming words
    for(let i = 0 ; i < wordsCopy.length; i++) {
        //create div element
        let div = document.createElement("div");
        let txt = document.createTextNode(wordsCopy[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    //call play function
    startPlay();
};

function startPlay() {
    //restart timer for every new word
    timeLeftSpan.innerHTML = defaultLevelSeconds;

    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML === "0") {
            //stop timer
            clearInterval(start);
            //compare words
            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                //empty input field
                input.value = "";
                //encrease score
                scoreGot.innerHTML++;
                //
                if(wordsCopy.length > 0) {
                    genWords();
                }
                else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("You won !");
                    span.appendChild(spanText);
                    finishMsg.appendChild(span);
                    //remove upcoming words box
                    upcomingWords.remove();                    
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMsg.appendChild(span);
                restartButton.classList.remove("inactive");
                quitButton.classList.remove("inactive");
                disable();
            }
        }
    }, 1000);
};

function enable() {
    input.disabled = false;
};

function disable() {
    input.disabled = true;
};