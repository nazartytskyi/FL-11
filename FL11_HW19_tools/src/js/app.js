let start_button = document.getElementById('start-button');
let reset_button = document.getElementById('reset-button');

let logo_img = document.getElementsByClassName('logo-img')[0];

let total = document.getElementById('total');
let total_text = document.getElementById('total-text');

let rules = document.getElementById('rules');
let game = document.getElementById('game');

let humanScore = 0;
let computerScore = 0;
let round = 0;

let img_choice = document.querySelectorAll('.human-choice-img');
let copmuter_choice_img = document.getElementsByClassName('computer-choice-img')[0];

let startGame = () => {
    rules.style.display = 'none';
    game.style.display = 'flex';
    logo_img.style.display = 'none';
}

let resetGame = () => {
    rules.style.display = 'flex';
    logo_img.style.display = 'flex';
    game.style.display = 'none';
    copmuter_choice_img.src = 'img/question.jpg';
    humanScore = 0;
    computerScore = 0;
    round = 0;
    total.innerHTML = '';
    total_text.innerHTML = '';
}

start_button.addEventListener("click", startGame);
reset_button.addEventListener("click", resetGame);
