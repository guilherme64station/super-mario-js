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

// Função para encerrar o jogo
const endGame = () => {
    isGameOver = true; // Define o jogo como encerrado
    clearInterval(gameLoop); // Para o loop do jogo
    mario.src = './img/game-over.png'; // Define a imagem do Mario para Game Over
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
};

// Função de inicialização do jogo (chamada ao carregar a página)
const initGame = () => {
    // Iniciar o loop do jogo
    startGameLoop();

    // Encerrar o jogo após 5 minutos (300000 ms)
    setTimeout(() => {
        endGame(); // Chama a função de encerramento do jogo
        alert("O tempo acabou!"); // Alerta o usuário que o tempo acabou
        window.location.href = "about:blank"; // Redireciona para uma página em branco
    }, 300000); // 5 minutos em milissegundos

    // Adicionar o listener para o evento de pulo (keydown)
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            jump();
        }
    });
};

// Inicializar o jogo ao carregar a página
initGame();
