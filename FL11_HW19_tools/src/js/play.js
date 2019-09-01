let play = (event) => {
    if (round < 3) {
        let humanChoice = event.target.id;
        let random = Math.floor(Math.random() * 3);
        let copmuterChoice = '';
        let res = '';

        if (random === 0) {
            copmuter_choice_img.src = 'img/paper.png';
            copmuterChoice = 'paper';
        } else if (random === 1) {
            copmuter_choice_img.src = 'img/rock.png';
            copmuterChoice = 'rock';
        } else if (random === 2) {
            copmuter_choice_img.src = 'img/scissors.png'
            copmuterChoice = 'scissors';
        }

        if (copmuterChoice === 'paper' && humanChoice === 'rock') {
            computerScore++;
            res = 'LOSE';
        } else if (copmuterChoice === 'paper' && humanChoice === 'scissors') {
            humanScore++;
            res = 'WON';
        } else if (copmuterChoice === 'rock' && humanChoice === 'paper') {
            humanScore++;
            res = 'WON';
        } else if (copmuterChoice === 'rock' && humanChoice === 'scissors') {
            computerScore++;
            res = 'LOSE';
        } else if (copmuterChoice === 'scissors' && humanChoice === 'paper') { 
            computerScore++;
            res = 'LOSE';
        } else if (copmuterChoice === 'scissors' && humanChoice === 'rock') {
            humanScore++;
            res = 'WON';
        } else if (copmuterChoice === humanChoice) {
            res = 'TIE';
        }

        round++;

        total.innerHTML = `${humanScore} : ${computerScore}`;
        total_text.innerHTML = `Round ${round}</br> 
                                ${humanChoice} vs. ${copmuterChoice}</br>
                                    You've ${res}! </br> </br>`;
                                    
        if (round === 3) {
            if(humanScore > computerScore) {
                total_text.innerHTML += `FINAL RESULT: YOU'VE WON! </br> RESET TO PLAY AGAIN!`;
            } else if (humanScore == computerScore) {
                total_text.innerHTML += `FINAL RESULT: YOU'VE TIE! </br> RESET TO PLAY AGAIN!`;
            } else if (humanScore < computerScore){
                total_text.innerHTML += `FINAL RESULT: YOU'VE LOSE! </br> RESET TO PLAY AGAIN!`;
            }
        } 
    }
}

img_choice.forEach(elem => {
    elem.addEventListener('click', play);
});