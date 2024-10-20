const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const currentScoreElement = document.getElementById('current-score');
const highScoreElement = document.getElementById('high-score');
let isGameOver = false;
let gameLoop;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0; // Recupera o recorde do localStorage

// Atualiza a exibição do recorde
highScoreElement.textContent = highScore;

// Função de pulo
const jump = () => {
    if (!isGameOver && !mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

// Função para iniciar o loop do jogo
const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        // Verifica se Mario colidiu com o pipe
        if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            isGameOver = true; // Define o jogo como encerrado
            clearInterval(gameLoop); // Para o loop do jogo

            // Verifica e atualiza o recorde
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore); // Armazena o novo recorde no localStorage
                highScoreElement.textContent = highScore; // Atualiza a exibição do recorde
            }
        } else if (!isGameOver) {
            // Incrementa a pontuação a cada 100 ms
            score += 1;
            currentScoreElement.textContent = score; // Atualiza a pontuação exibida
        }
    }, 100);
};

// Função para resetar o jogo
const resetGame = () => {
    score = 0; // Reseta a pontuação
    currentScoreElement.textContent = score;
    isGameOver = false; // Define que o jogo não está mais terminado

    // Resetar o Mario e o Pipe para as posições iniciais
    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.bottom = '0px';

    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = 'auto'; // Restaura a animação do pipe

    clearInterval(gameLoop); // Certifica-se de que o antigo loop foi parado
    startGameLoop(); // Reiniciar o loop do jogo
};

// Evento para pulo sempre ativo
window.addEventListener('keydown', (event) => {
    if (!isGameOver && (event.code === 'Space' || event.code === 'ArrowUp')) {
        jump();
    }
});


// Inicializar o jogo ao carregar a página
startGameLoop();
