// const mario = document.querySelector('.mario');
// const pipe = document.querySelector('.pipe');
// const currentScoreElement = document.getElementById('current-score');
// const highScoreElement = document.getElementById('high-score');
// const startButton = document.querySelector('.start-button');
// let isGameOver = false;
// let gameLoop;
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;

// highScoreElement.textContent = highScore;

// // Função para iniciar o jogo ao clicar no botão
// const startGame = () => {
//     score = 0;
//     isGameOver = false;
//     currentScoreElement.textContent = score;
//     highScoreElement.textContent = highScore;

//     startButton.style.display = 'none'; // Esconde o botão "Começar"
//     startGameLoop();
// };

// // Função de pulo
// const jump = () => {
//     if (!isGameOver && !mario.classList.contains('jump')) {
//         mario.classList.add('jump');
//         setTimeout(() => {
//             mario.classList.remove('jump');
//         }, 500);
//     }
// };

// // Loop do jogo
// const startGameLoop = () => {
//     gameLoop = setInterval(() => {
//         const pipePosition = pipe.offsetLeft;
//         const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

//         if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
//             pipe.style.animation = 'none';
//             pipe.style.left = `${pipePosition}px`;

//             mario.style.animation = 'none';
//             mario.style.bottom = `${marioPosition}px`;

//             mario.src = './img/game-over.png';
//             mario.style.width = '75px';
//             mario.style.marginLeft = '50px';

//             isGameOver = true;
//             clearInterval(gameLoop);

//             if (score > highScore) {
//                 highScore = score;
//                 localStorage.setItem('highScore', highScore);
//                 highScoreElement.textContent = highScore;
//             }

//             startButton.style.display = 'block'; // Mostra o botão para reiniciar
//             startButton.textContent = 'Reiniciar'; // Muda o texto do botão
//         } else if (!isGameOver) {
//             score += 1;
//             currentScoreElement.textContent = score;
//         }
//     }, 100);
// };

// // Função para resetar o jogo
// const resetGame = () => {
//     score = 0;
//     currentScoreElement.textContent = score;
//     isGameOver = false;

//     mario.src = './img/mario.gif';
//     mario.style.width = '150px';
//     mario.style.marginLeft = '0px';
//     mario.style.bottom = '0px';
//     mario.classList.remove('jump'); // Garante que a classe jump é removida

//     pipe.style.animation = 'pipe-animation 1.5s infinite linear';

//     clearInterval(gameLoop);
//     startGameLoop();
// };

// // Evento para pulo
// window.addEventListener('keydown', (event) => {
//     if (!isGameOver && (event.code === 'Space' || event.code === 'ArrowUp')) {
//         jump();
//     }
// });
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const currentScoreElement = document.getElementById('current-score');
const highScoreElement = document.getElementById('high-score');
const startButton = document.querySelector('.start-button');
const gameOverScreen = document.querySelector('.game-over-screen');
let isGameOver = false;
let gameLoop = null; // Certifica-se de que o loop esteja vazio inicialmente
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreElement.textContent = highScore;

// Função para iniciar o jogo ao clicar no botão "Começar"
const startGame = () => {
    score = 0;
    isGameOver = false;
    currentScoreElement.textContent = score;
    highScoreElement.textContent = highScore;

    startButton.style.display = 'none'; // Esconde o botão "Começar"
    gameOverScreen.classList.remove('visible'); // Esconde a tela de "Game Over"

    // Inicia as animações do cano e das nuvens
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    document.querySelector('.clouds').style.animation = 'clouds-animation 20s infinite linear';

    // Inicia o loop do jogo
    if (!gameLoop) { // Verifica se o gameLoop já não está em andamento
        startGameLoop();
    }
};

// Função de pulo
const jump = () => {
    if (!isGameOver && !mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

// Loop do jogo
const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            isGameOver = true;
            clearInterval(gameLoop);
            gameLoop = null; // Limpa o loop do jogo para permitir reinício posterior

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreElement.textContent = highScore;
            }

            // Exibe a tela de "Game Over" sem reiniciar o jogo
            gameOverScreen.classList.add('visible');
        } else if (!isGameOver) {
            // Incrementa a pontuação a cada 100 ms somente se o jogo estiver ativo
            score += 1;
            currentScoreElement.textContent = score;
        }
    }, 100);
};

// Evento para pulo
window.addEventListener('keydown', (event) => {
    if (!isGameOver && (event.code === 'Space' || event.code === 'ArrowUp')) {
        jump();
    }
});

// Desabilitar animações até o jogo começar
pipe.style.animation = 'none';
document.querySelector('.clouds').style.animation = 'none';

// Inicializar o jogo ao carregar a página
startGameLoop();
