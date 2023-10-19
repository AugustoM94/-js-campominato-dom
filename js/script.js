const btn = document.getElementById('gioca');
const resetBtn = document.getElementById('resetButton');
const difficultySelect = document.getElementById('difficultySelect');
const countdown = document.getElementById('countdown'); 

let timeleft = 0;
let downloadTimer;
const numBombs = 16;
let gameOver = false;
let score;;
let numSquare;
let bombs;


btn.addEventListener('click', function () {
    const difficulty = parseInt(difficultySelect.value); 

    if (difficulty === 1) {
        numSquare = 100;
        timeleft = 0;
    } else if (difficulty === 2) {
        numSquare = 81;
        timeleft = 0;
    } else if (difficulty === 3) {
        numSquare = 49;
        timeleft = 0;
    }
    
    countdown.innerHTML = timeleft + "&nbsp";

    downloadTimer = setInterval(function () {
        timeleft += 1;
        countdown.innerHTML = timeleft + "&nbsp";
    }, 1000);

    const playground = document.getElementById('playground');
    playground.innerHTML = '';

    for (let i = 0; i < numSquare; i++) {
        let square = drawSquare(i, numSquare);
        playground.append(square);
    }
    const max_attempt = numSquare - numBombs;
    function generateBombs(){
        const bombsArray = [];
        while(bombsArray.length < numBombs){
            let bomb = getRandomInteger(1, numSquare);
            if(!bombsArray.includes(bomb)){
                bombsArray.push(bomb)
                
            }
        } 
        return bombsArray;
}});

resetBtn.addEventListener('click', function () {
    const squares = document.querySelectorAll('.square');
    const playground = document.getElementById('playground');

    squares.forEach(square => {
        playground.removeChild(square);
    });
    clearInterval(downloadTimer);
    timeleft === 0;
});

function drawSquare(squareIndex, numSquare) {
    const squareWidth = Math.sqrt(numSquare);
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${squareWidth})`;
    square.style.height = square.style.width;
    square.addEventListener ('click', function drawClick() {
        square.innerHTML = squareIndex + 1;
        let message;
        if(bombs.includes(parseInt(square.textContent))){
            square.classList.add('bomb');
            square.style.color = 'white';
            square.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
            message = `Hai perso !!! il tuo punteggio è: ${score}`;
       gameOver()    
        } else {
        square.classList.add('active');
        square.style.color = 'white';
        score++
        if(score === max_attempt) {
            message = `Hai vinto !!! il tuo punteggio è: ${score}`;
            gameOver()
        } else {
             message = `il tuo punteggio è: ${score}`
        }
}});

return square;

function gameOver(){
    const arraySquareBombs = document.getElementsByClassName('square');
    for ( let i = 0; i < arraySquareBombs.length; i++){
        let el = arraySquareBombs[i];
        el.removeEventListener('click', drawClick);
        if (bombs.includes(parseInt(el.textContent))){
            el.classList.add("bomb");
            el.style.color = "black";
            el.innerHTML =  '<i class="fa-solid fa-bomb fa-beat"></i>';
        }
    }
}

    }
    








function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}