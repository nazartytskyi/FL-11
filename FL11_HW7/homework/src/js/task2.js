const NUM_OF_ATTEMPTS = 3;
const START_RANGE = 8;
const START_PRIZE = 100;
const DECREASE_DIVIDER = 2;
const INCREASE_MULTIPLIER = 3;
const PRIZE_INCREASE = 4;

let maxRange = START_RANGE;
let totalPrize = 0;
let possiblePrize = START_PRIZE;
let continueAnswer = confirm('Do you want to play a game?');
let i, randomNumber, userNumber, currentAtemptPossiblePrize;

if (continueAnswer) {
	while (continueAnswer) {
		continueAnswer = false;
		randomNumber = Math.floor( Math.random() * (maxRange + 1) );
		currentAtemptPossiblePrize = possiblePrize;

		for (i = 1; i < NUM_OF_ATTEMPTS + 1; i++ ) { 
			userNumber = parseInt( prompt(
				'Enter a number from 0 to ' + maxRange + 
				'\nAttempts left: ' + (NUM_OF_ATTEMPTS + 1 - i) + 
				'\nTotal prize: ' + totalPrize + '$' +
				'\nPossible prize on current attempt: ' + currentAtemptPossiblePrize + '$' ) );

			if (userNumber === randomNumber) {
				totalPrize += currentAtemptPossiblePrize;
				continueAnswer = confirm(
					'Congratulation! \nYour prize is: ' + totalPrize + '$' + 
					'\nDo you want to continue?');

				break;
			}
			
			if (i === 3) {
				totalPrize = 0;
			}
			
			currentAtemptPossiblePrize = currentAtemptPossiblePrize / DECREASE_DIVIDER;
		}
		
		possiblePrize *= INCREASE_MULTIPLIER;
		maxRange += PRIZE_INCREASE;

		if (!continueAnswer) {
			alert('Thank you for your participation. Your prize is: ' + totalPrize + '$');
			
			continueAnswer = confirm('Do you want to play again?'); 
			maxRange = START_RANGE;
			possiblePrize = START_PRIZE;
			totalPrize = 0;
		}
	}
} else {
	alert('You did not become a millionaire, but can.');
}
