// We're creating a list of three options for the letters
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// This array will hold what we guess
var guessedLetters = [];

// This variable will be randomly assigned one of the three letters
var letterToGuess = null;

// These are what we'll use to count down
var totalGuesses = 9;
var guessesLeft = 9;

// This is the counter for wins/losses
var wins = 0;
var losses = 0;

// Below we created three functions to updateGuesses, updateGuessesLeft, and updateGuessesSoFar
var updateGuessesLeft = function() {
    // Here we are grabbing the HTML element and setting it equal to the guessesLeft.
    // (i.e. guessesLeft will get displayed in HTML)
    document.querySelector("#guessesleft").innerHTML = ("Guesses left: " + guessesLeft);
};

var updateLetterToGuess = function() {
    // Here we get a random letterToGuess and assign it based on a random generator (only looking at a, b, or c)
    this.letterToGuess = this.letters[Math.floor(Math.random() * this.letters.length)];
};

var updateGuessesSoFar = function() {
    // Here we take the guesses the user has tried -- then display it as letters separated by commas.
    document.querySelector("#guesslist").innerHTML = guessedLetters.join(", ");
};

// Function will be called when we reset everything
var reset = function() {
    totalGuesses = 9;
    guessesLeft = 9;
    guessedLetters = [];
    updateLetterToGuess();
    updateGuessesLeft();
    updateGuessesSoFar();
};

// Execute on page load.
updateLetterToGuess();
updateGuessesLeft();

// This function will capture the keyboard clicks.
document.onkeyup = function(event) {
    // It's going to reduce the guesses by one
    guessesLeft--;

    // Lowercase the letter
    var letter = String.fromCharCode(event.keyCode).toLowerCase();

    // Then add the guess to the guessedLetters array
    guessedLetters.push(letter);

    // Then its going to run the update functions
    updateGuessesLeft();
    updateGuessesSoFar();


    // We'll check if there's a match.
    if (letter === letterToGuess) {

        // If there is then we win and we'll update the HTML to display the win.
        wins++;
        document.querySelector("#win").innerHTML = ("Wins: " + wins);

        // Then we'll reset the game
        reset();
    }


    // If we are out of guesses...
    if (guessesLeft === 0) {

        // Then we will loss and we'll update the HTML to display the loss.
        losses++;
        document.querySelector("#lose").innerHTML = ("Losses: " + losses);

        // Then we'll call the reset.
        reset();
    }
};