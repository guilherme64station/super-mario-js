const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const currentScoreElement = document.getElementById('current-score');
const highScoreElement = document.getElementById('high-score');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
let isGameOver = false;
let gameLoop;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreElement.textContent = highScore;

const jump = () => {
    if (!isGameOver && !mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500); // Tempo do pulo
    }
};

const checkCollision = () => {
    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    // Verifica se Mario colidiu com o pipe
    if (
        pipeRect.left < marioRect.right &&
        pipeRect.right > marioRect.left &&
        marioRect.bottom > pipeRect.top
    ) {
        return true; // Colisão com o pipe
    }
    return false; // Sem colisão
};

const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;

        // Verifica se Mario colidiu com o pipe
        if (checkCollision()) {
            endGame();
        }

        // Lógica para aumentar a pontuação
        score += 1;
        currentScoreElement.textContent = score;
    }, 100);
};

const endGame = () => {
    isGameOver = true;
    clearInterval(gameLoop);
    mario.src = './img/game-over.png'; // Atualize a imagem conforme necessário
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = highScore;
    }
};

const initGame = () => {
    startGameLoop();
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            jump();
        }
    });
};

initGame();
