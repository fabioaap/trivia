// Importar sistema de viewport
import { setupViewport } from "../src/viewportScale.js";

// Estado do jogo
class TriviaGame {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.timer = null;
        this.gameActive = false;

        // Elementos DOM
        this.welcomeSection = document.querySelector('.welcome-section');
        this.gameArea = document.getElementById('gameArea');
        this.resultsSection = document.getElementById('resultsSection');
        this.questionEl = document.getElementById('question');
        this.optionsEl = document.querySelectorAll('.option');
        this.timerEl = document.getElementById('timer');
        this.scoreEl = document.getElementById('score');
        this.currentQuestionEl = document.getElementById('currentQuestion');
        this.totalQuestionsEl = document.getElementById('totalQuestions');
        this.categoryEl = document.getElementById('questionCategory');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadQuestions();
    }

    setupEventListeners() {
        // Botão começar jogo
        document.querySelector('.cta-btn').addEventListener('click', () => {
            this.startGame();
        });

        // Botões de opções com coordenadas convertidas
        this.optionsEl.forEach(option => {
            option.addEventListener('click', (e) => {
                if (this.gameActive) {
                    this.selectAnswer(e.target);
                }
            });

            // Adicionar suporte para eventos de ponteiro com coordenadas convertidas
            option.addEventListener('pointerdown', (e) => {
                if (this.gameActive && window.viewportHandle) {
                    const gameCoords = window.viewportHandle.toGame(e.clientX, e.clientY);
                    console.log('Clique convertido:', gameCoords);
                    this.selectAnswer(e.target);
                }
            });
        });

        // Botões de resultados
        document.querySelector('.play-again-btn')?.addEventListener('click', () => {
            this.playAgain();
        });

        document.querySelector('.home-btn')?.addEventListener('click', () => {
            this.goHome();
        });

        // Navegação
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleNavigation(e.target.textContent.trim());
            });
        });
    }

    loadQuestions() {
        // Perguntas de exemplo - você pode substituir por uma API real
        this.questions = [
            {
                question: "Qual é a capital do Brasil?",
                options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
                correct: 2,
                category: "Geografia"
            },
            {
                question: "Quanto é 15 × 8?",
                options: ["120", "112", "108", "130"],
                correct: 0,
                category: "Matemática"
            },
            {
                question: "Quem pintou 'A Noite Estrelada'?",
                options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
                correct: 1,
                category: "Arte"
            },
            {
                question: "Qual é o maior planeta do Sistema Solar?",
                options: ["Saturno", "Júpiter", "Urano", "Netuno"],
                correct: 1,
                category: "Ciência"
            },
            {
                question: "Em que ano o homem pisou na Lua pela primeira vez?",
                options: ["1969", "1965", "1972", "1959"],
                correct: 0,
                category: "História"
            },
            {
                question: "Qual é o elemento químico mais abundante no Universo?",
                options: ["Oxigênio", "Carbono", "Hidrogênio", "Hélio"],
                correct: 2,
                category: "Ciência"
            },
            {
                question: "Quem escreveu 'Dom Quixote'?",
                options: ["Miguel de Cervantes", "William Shakespeare", "Dante Alighieri", "Homero"],
                correct: 0,
                category: "Literatura"
            },
            {
                question: "Qual é a fórmula da água?",
                options: ["CO2", "H2O", "O2", "NaCl"],
                correct: 1,
                category: "Química"
            },
            {
                question: "Em que continente fica o Egito?",
                options: ["Ásia", "Europa", "África", "América"],
                correct: 2,
                category: "Geografia"
            },
            {
                question: "Qual é o resultado de 2³ × 4?",
                options: ["32", "24", "16", "48"],
                correct: 0,
                category: "Matemática"
            }
        ];

        this.shuffleArray(this.questions);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.gameActive = true;

        this.showSection('gameArea');
        this.loadQuestion();
        this.startTimer();
    }

    loadQuestion() {
        if (this.currentQuestionIndex >= Math.min(this.questions.length, 10)) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        this.currentQuestion = question;

        // Atualizar elementos da UI
        this.questionEl.textContent = question.question;
        this.categoryEl.textContent = question.category;
        this.currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        this.totalQuestionsEl.textContent = Math.min(this.questions.length, 10);
        this.scoreEl.textContent = this.score;

        // Carregar opções
        this.optionsEl.forEach((option, index) => {
            option.textContent = `${String.fromCharCode(65 + index)}) ${question.options[index]}`;
            option.dataset.correct = index === question.correct;
            option.className = 'option';
        });

        // Reset timer
        this.timeLeft = 30;
        this.timerEl.textContent = this.timeLeft;
    }

    selectAnswer(selectedOption) {
        if (!this.gameActive) return;

        this.gameActive = false;
        clearInterval(this.timer);

        const isCorrect = selectedOption.dataset.correct === 'true';

        // Marcar opção selecionada
        selectedOption.classList.add('selected');

        // Marcar resposta correta/incorreta
        setTimeout(() => {
            if (isCorrect) {
                selectedOption.classList.add('correct');
                this.score += 10;
                this.scoreEl.textContent = this.score;
            } else {
                selectedOption.classList.add('incorrect');
                // Mostrar resposta correta
                this.optionsEl[parseInt(selectedOption.dataset.correct) === 0 ? 0 :
                              parseInt(selectedOption.dataset.correct) === 1 ? 1 :
                              parseInt(selectedOption.dataset.correct) === 2 ? 2 : 3].classList.add('correct');
            }

            // Próxima pergunta após delay
            setTimeout(() => {
                this.nextQuestion();
            }, 2000);
        }, 500);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.gameActive = true;
        this.loadQuestion();
        this.startTimer();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timerEl.textContent = this.timeLeft;

            if (this.timeLeft <= 0) {
                this.timeUp();
            } else if (this.timeLeft <= 10) {
                this.timerEl.parentElement.classList.add('timer-warning');
            }
        }, 1000);
    }

    timeUp() {
        this.gameActive = false;
        clearInterval(this.timer);

        // Mostrar resposta correta
        this.optionsEl.forEach(option => {
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
            }
        });

        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timer);

        const accuracy = Math.round((this.score / (Math.min(this.questions.length, 10) * 10)) * 100);

        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('accuracy').textContent = `${accuracy}%`;

        this.showSection('resultsSection');
    }

    playAgain() {
        this.shuffleArray(this.questions);
        this.startGame();
    }

    goHome() {
        this.showSection('welcomeSection');
        this.gameActive = false;
        clearInterval(this.timer);
    }

    showSection(sectionName) {
        this.welcomeSection.style.display = 'none';
        this.gameArea.style.display = 'none';
        this.resultsSection.style.display = 'none';

        switch (sectionName) {
            case 'welcomeSection':
                this.welcomeSection.style.display = 'block';
                break;
            case 'gameArea':
                this.gameArea.style.display = 'block';
                break;
            case 'resultsSection':
                this.resultsSection.style.display = 'block';
                break;
        }
    }

    handleNavigation(section) {
        switch (section) {
            case 'Início':
                this.goHome();
                break;
            case 'Categorias':
                this.showCategories();
                break;
            case 'Ranking':
                this.showRanking();
                break;
            case 'Perfil':
                this.showProfile();
                break;
        }
    }

    showCategories() {
        // Implementar tela de categorias
        alert('Funcionalidade de categorias será implementada em breve!');
    }

    showRanking() {
        // Implementar tela de ranking
        alert('Funcionalidade de ranking será implementada em breve!');
    }

    showProfile() {
        // Implementar tela de perfil
        alert('Funcionalidade de perfil será implementada em breve!');
    }
}

// Sistema de áudio (opcional)
class AudioManager {
    constructor() {
        this.sounds = {
            correct: new Audio('assets/sounds/correct.mp3'),
            incorrect: new Audio('assets/sounds/incorrect.mp3'),
            timer: new Audio('assets/sounds/timer.mp3'),
            gameOver: new Audio('assets/sounds/game-over.mp3')
        };
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].play().catch(e => {
                // Silenciar erro se áudio não estiver disponível
                console.log('Áudio não disponível:', e);
            });
        }
    }
}

// Inicialização quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Configurar viewport scaling
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        window.viewportHandle = setupViewport(canvas, 1920, 1080, 2);
        console.log('Viewport configurado:', window.viewportHandle);
    }

    window.triviaGame = new TriviaGame();
    window.audioManager = new AudioManager();

    // Adicionar efeitos visuais
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('mouseenter', function() {
            if (window.triviaGame.gameActive) {
                this.style.transform = 'translateX(5px)';
            }
        });

        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Efeito de carregamento inicial
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Funções utilitárias
function formatTime(seconds) {
    return `${seconds}s`;
}

function animateNumber(element, from, to, duration = 1000) {
    const start = Date.now();
    const step = () => {
        const progress = Math.min((Date.now() - start) / duration, 1);
        const current = Math.floor(from + (to - from) * progress);
        element.textContent = current;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// Exportar para uso global
window.TriviaGame = TriviaGame;
window.AudioManager = AudioManager;
