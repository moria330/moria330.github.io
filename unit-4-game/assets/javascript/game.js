/*Crystal Game
create score variable
generate a random target score between 19 - 120
create a random value for each individual crystal between 1-12
onclick of a crystal add value to playerscore and display new score
if the player reaches the target score the game ends with a win
if the player score goes over the target score the player loses
if win increase win counter by 1
if lose increase loss counter by 1
if win or lose reset game to play
on reset reset playerScore 
generate new targetScore
asign new values to the images
clear player score displayed
*/

var playerScore = 0;
var targetScore = Math.round(Math.random() * (120 - 19)) + 19;
var crystalValue = Math.round(Math.random() * (12 - 1)) + 1;
var win = 0;
var lose = 0;

$(document).ready(function(){

	//Generate Target score
	$('#target-score').html('<h1>' + targetScore + '</h1>');

	//Display Player score
	$('#player-score').html('<h1>' + playerScore + '</h1>');

	

	for (var i = 1; i < 5; i++) {
		var gems = $('<img>');
		gems.addClass("crystal-image");
		gems.attr("src", "assets/images/" + i + ".jpg");
		gems.attr("value", Math.round(Math.random()*(12 - 1)) + 1);
		$('#crystals').append(gems);

	}

	$('.crystal-image').on("click", function(){
		var crystalPoints = ($(this).attr("value"));
		crystalPoints = parseInt(crystalPoints);
		playerScore += crystalPoints;
		score();
		console.log($(this).attr("value"));
		console.log(playerScore);

		//Player win condition
		if (playerScore === targetScore) {
		winner();
		reset();
		console.log(playerScore);
		console.log(targetScore);
		} 
		//Player lose conditon
		if (playerScore > targetScore) {
		loser();
		console.log("Before reset " + playerScore);
		console.log("Before reset " + targetScore);
		reset();
		console.log("After reset() playerScore " + playerScore);
		console.log("After reset() targetScore " + targetScore);
		}
	});

	
//reset the game	
function reset(){
	playerScore = 0;
	$('#player-score').html('<h1>' + playerScore + '</h1>');
	targetScore = Math.round(Math.random() * (120 - 19)) + 19;
	crystalValue = Math.round(Math.random() * (12 - 1)) + 1;
	$('#target-score').html('<h1>' + targetScore + '</h1>');
}

function score() {
	$('#player-score').html('<h1>' + playerScore + '</h1>');
}

function winner() {
	win++;
	$('#wins').text("Wins: " + win);
	alert("You won!");
	
}

function loser() {
	lose++;
	$('#lose').text("Losses: " + lose);
	alert("You lost. Try again.");
	console.log("Lose score: " + playerScore);
}
});

