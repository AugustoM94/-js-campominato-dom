startGame();

function startGame() {
    const btn = document.getElementById('gioca');
    const resetBtn = document.getElementById('resetButton');
    const difficultySelect = document.getElementById('difficultySelect');
    const countdown = document.getElementById('countdown');

    let timeleft = 0;
    let downloadTimer;
    const numBombs = 16;
    let gameOver = false;
    let score = 0;
    let numSquare;
    let bombs = [];
    let gameInProgress = false;

    btn.addEventListener('click', function () {
        const difficulty = parseInt(difficultySelect.value);
        gameInProgress = true;
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

        bombs = generateBombs();
        countdown.innerHTML = "TEMPO: " + timeleft;

        downloadTimer = setInterval(function () {
            timeleft++;
            countdown.innerHTML = timeleft + "s";
        }, 1000);

        const playground = document.getElementById('playground');
        playground.innerHTML = '';

        for (let i = 0; i < numSquare; i++) {
            let square = drawSquare(i, numSquare);
            playground.append(square);
        }
    });

    resetBtn.addEventListener('click', function () {
        const squares = document.querySelectorAll('.square');
        const playground = document.getElementById('playground');

        squares.forEach(square => {
            playground.removeChild(square);
        });
        clearInterval(downloadTimer);
        timeleft = 0;
        score = 0;
        gameOver = false;
    });

    const max_attempt = numSquare - numBombs;

    function drawClick(square, squareIndex) {
        if (gameInProgress) {
            square.innerHTML = squareIndex + 1;
            if (bombs.includes(squareIndex + 1)) {
                square.classList.add('bomb');
                square.style.color = 'black';
                square.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
                gameOver = true;
                message = `Hai Perso !!! il tuo punteggio è: ${score}`;
                gameInProgress = false;
                revealBombs();
            } else {
                square.classList.add('active');
                square.style.color = 'white';
                score++;
                if (score === max_attempt) {
                    message = `Hai vinto !!! il tuo punteggio è: ${score}`;
                    gameOver();
                } else {
                    message = `il tuo punteggio è: ${score}`;
                }
            }
            document.getElementById('score').innerHTML = message;
        }
    }

    function generateBombs() {
        const bombsArray = [];
        while (bombsArray.length < numBombs) {
            let bomb = getRandomNumber(1, numSquare);
            if (!bombsArray.includes(bomb)) {
                bombsArray.push(bomb);
            }
        }
        return bombsArray;
    }

    function drawSquare(squareIndex, numSquare) {
        const squareWidth = Math.sqrt(numSquare);
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `calc(100% / ${squareWidth})`;
        square.style.height = square.style.width;

        square.addEventListener('click', function () {
            drawClick(square, squareIndex);
        });

        return square;
    }

    function revealBombs() {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            if (bombs.includes(index + 1)) {
                square.classList.add('bomb');
                square.style.color = 'black';
                square.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
            }
        });
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

