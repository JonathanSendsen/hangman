// Beginning to create the correct words for the game.
let correctWords = ['javascript sucks', 'atari', 'captain planet', 'mortal kombat', 'oxygen', 'yacht', 'sphinx' ]  

// Maximum amount of attempts a user gets
const maxAttempts = 10;            

var guessedLetters = [];        // holds an array of letters that has been guessed
var currentWordIndex = [];      // store the index of the randomly selected words
var guessingWord = [];          // stores the letters that have been properly guessed
var remainingGuesses = 0;       // How many tries the user has left
var gameStarted = false;        // Prompts users to start the game
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up
var showHint = [];


//  Updates the display on my index.html page
function updateDisplay() {

    document.getElementsByClassName("totalWins")[0].innerText = wins;
    document.getElementsByClassName("currentWord")[0].innerText = "You Win";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementsByClassName("currentWord")[0].innerText += guessingWord[i];
    }
    document.getElementsByClassName("remainingGuesses")[0].innerText = remainingGuesses;
    document.getElementsByClassName("guessedLetters")[0].innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementsByClassName("lost")[0].style.cssText = 'display: block';
        document.getElementsByClassName("tryAgainKey")[0].style.cssText = "display:block";
        hasFinished = true;
    }
};

// This function reset's game variables
function resetGame() {
    remainingGuesses = maxAttempts;
    gameStarted = false;

    // Using Math.floor to round the number to its nearest integer
    currentWordIndex = Math.floor(Math.random() * (correctWords.length));

    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // clears my hangman image after  maxAttempts  exceeded
    document.getElementsByClassName("hangman")[0].src = "../hangman/assets/images/hang.png";

    // Build the guessing word and clear it out
    for (var i = 0; i < correctWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    };

       // Hide game over and win images/text
       document.getElementsByClassName("pressKeyTryAgain")[0].style.cssText = "display: none";
       document.getElementsByClassName("lost")[0].style.cssText = "display: none";
       document.getElementsByClassName("win")[0].style.cssText = "display: none";
   
       // Show display
       updateDisplay();
   };


   // Updates the display on the html page
function updateDisplay() {

    document.getElementsByClassName("totalWins")[0].innerText = wins;

    // Display how much of the word someone has already guessed on screen.
    // Printing the array would add commas (,) in order to link a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    //
    document.getElementsByClassName("currentWord")[0].innerText = guessingWordText;
    document.getElementsByClassName("remainingGuesses")[0].innerText = remainingGuesses;
    document.getElementsByClassName("guessedLetters")[0].innerText = guessedLetters;
};

// Updates the hangman image depending on how many guesses
function updateHangmanImage() {
    document.getElementsByClassName("hangman").src = "../hangman/assets/images/hang.png" + (maxAttempts - remainingGuesses) + "../hangman/assets/images/hang.png";
};

// This function takes a letter and finds all instances of in that string to replace them with the guessed word
function evaluateGuess(letter) {
    // This 'any' array stores the positions of letters in string
    var positions = [];

    // Loops through the correct words finding of a guessed letter and storing the letter in an array.
    for (var i = 0; i < correctWords[currentWordIndex].length; i++) {
        if(correctWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no correct findings, remove the guesses and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        // Loop through all findings and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

// Function that checks wins by seeing if there are any remaining underscores in the guessingWord.
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementsByClassName("win")[0].style.cssText = "display: block";
        document.getElementsByClassName("pressKeyTryAgain")[0].style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};

// Checks for a loss
function checkLoss()
{
    if(remainingGuesses <= 0) {
        document.getElementsByClassName("lost")[0].style.cssText = "display: block";
        document.getElementsByClassName("pressKeyTryAgain")[0].style.cssText = "display: block";
        hasFinished = true;
    }
}

// Allows users to make a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Makes sure the users didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};

// Introducing and event listener
document.onkeydown = function(event) {
    // If the user finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Condition to check and make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};

// This section will allows hints to be displayed based on correctWords array

// Allows users to click hint button and 
var showHint = document.getElementById("hint").onclick = function () {

showHint = ['Computer Language',
 'Old Gaming Console', 'Marwans Favourite Superhero', 
 'Video Game Franchise', 'Important For Humans', 
 'Watercraft Signifying You Made It!', 'Specific Cat Breed']

};




