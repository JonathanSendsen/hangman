// Beginning to create the correct words for the game.
let correctWords = ['javascript sucks', 'atari', 'captain planet', 'mortal kombat', 'oxygen', 'yacht', 'sphinx' ]  

// Maximum amount of attempts a user gets
const maxAttempts = 11;            

var guessedLetters = [];        // holds an array of letters that has been guessed
var currentWordIndex = [];      // store the index of the randomly selected words
var guessingWord = [];          // stores the letters that have been properly guessed
var remainingGuesses = 0;       // How many tries the user has left
var gameStarted = false;        // Prompts users to start the game
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up


//  Updates the display on my index.html page
function updateDisplay() {

    document.getElementsByClassName("totalWins").innerText = wins;
    document.getElementsByClassName("currentWord").innerText = "You Win";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementsByClassName("currentWord").innerText += guessingWord[i];
    }
    document.getElementsByClassName("remainingGuesses").innerText = remainingGuesses;
    document.getElementsByClassName("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementsByClassName("lost").style.cssText = 'display: block';
        document.getElementsByClassName("tryAgainKey").style.cssText = "display:block";
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
    document.getElementsByClassName("hangman").src = "../hangman/assets/images/hang.png";

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

    document.getElementsByClassName("totalWins").innerText = wins;

    // Display how much of the word someone has already guessed on screen.
    // Printing the array would add commas (,) - to link a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    //
    document.getElementsByClassName("currentWord").innerText = guessingWordText;
    document.getElementsByClassName("remainingGuesses").innerText = remainingGuesses;
    document.getElementsByClassName("guessedLetters").innerText = guessedLetters;
};