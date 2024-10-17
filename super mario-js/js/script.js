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

// Atualiza a exibição do recorde
highScoreElement.textContent = highScore;

// Função de pulo
const jump = () => {
    if (!isGameOver && !mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500); // Tempo do pulo
    }
};

const checkCollision = () => {
    const enemy = document.getElementById('enemy');
    const enemyRect = enemy.getBoundingClientRect();
    const marioRect = mario.getBoundingClientRect();

    const marioIsJumping = mario.classList.contains('jump');

    // Verifica se Mario está colidindo com o Koopa
    if (
        enemyRect.left < marioRect.right &&
        enemyRect.right > marioRect.left &&
        enemyRect.top < marioRect.bottom &&
        enemyRect.bottom > marioRect.top
    ) {
        if (marioIsJumping) {
            // Mario "mata" o Koopa
            enemy.classList.add('defeated'); // Adiciona a classe de derrotado
            score += 5; // Adiciona pontos ao matar o Koopa
            currentScoreElement.textContent = score; // Atualiza a pontuação exibida
            enemy.style.left = '100%'; // Reseta a posição do Koopa
            return false; // Não finalize o jogo
        } else {
            // Se não estiver pulando, Mario morre
            return true; // Finaliza o jogo
        }
    }
    return false; // Sem colisão
};

const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const enemy = document.getElementById('enemy');
        const enemyPosition = enemy.offsetLeft;

        // Verifica se Mario colidiu com o pipe
        if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
            endGame();
        }

        // Verifica se Mario colidiu com o Koopa
        if (checkCollision()) {
            endGame(); // Chama a função para encerrar o jogo se não estiver pulando
        }

        // Movimento do Koopa
        enemy.style.left = `${enemyPosition - 25}px`; // Move o Koopa para a esquerda

        // Reseta a posição do Koopa se sair da tela
        if (enemyPosition < -80) {
            enemy.style.left = '100%'; // Reinicia a posição do Koopa
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
    
    // Atualiza a pontuação final e exibe a mensagem de Game Over
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block'; // Exibe a mensagem de Game Over

    // Verifica e atualiza o recorde
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Armazena o novo recorde no localStorage
        highScoreElement.textContent = highScore; // Atualiza a exibição do recorde
    }
};

// Função de inicialização do jogo (chamada ao carregar a página)
const initGame = () => {
    startGameLoop(); // Iniciar o loop do jogo

    // Adicionar o listener para o evento de pulo (keydown)
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            jump();
        }
    });
};

// Inicializar o jogo ao carregar a página
initGame();
