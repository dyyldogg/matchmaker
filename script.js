class StudentMatchmaker {
    constructor() {
        this.students = [];
        this.currentRound = 1;
        this.totalRounds = 5;
        this.timePerRound = 2.5; // minutes
        this.timer = null;
        this.timeLeft = 0;
        this.isGameActive = false;
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.setupPanel = document.getElementById('setupPanel');
        this.gamePanel = document.getElementById('gamePanel');
        this.studentCountInput = document.getElementById('studentCount');
        this.roundsInput = document.getElementById('rounds');
        this.timePerRoundInput = document.getElementById('timePerRound');
        this.startBtn = document.getElementById('startBtn');
        this.nextRoundBtn = document.getElementById('nextRoundBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.currentRoundSpan = document.getElementById('currentRound');
        this.totalRoundsSpan = document.getElementById('totalRounds');
        this.timerDisplay = document.getElementById('timer');
        this.pairsContainer = document.getElementById('pairsContainer');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.nextRoundBtn.addEventListener('click', () => this.nextRound());
        this.resetBtn.addEventListener('click', () => this.resetGame());
    }

    startGame() {
        const studentCount = parseInt(this.studentCountInput.value);
        this.totalRounds = parseInt(this.roundsInput.value);
        this.timePerRound = parseFloat(this.timePerRoundInput.value);

        if (studentCount < 2) {
            alert('You need at least 2 students to play!');
            return;
        }

        // Generate student numbers
        this.students = Array.from({ length: studentCount }, (_, i) => i + 1);
        this.currentRound = 1;
        this.isGameActive = true;

        // Show game panel
        this.setupPanel.style.display = 'none';
        this.gamePanel.style.display = 'block';

        this.updateRoundInfo();
        this.generatePairs();
        this.startTimer();
    }

    generatePairs() {
        this.pairsContainer.innerHTML = '';
        
        // Shuffle students for this round
        const shuffledStudents = [...this.students].sort(() => Math.random() - 0.5);
        
        // Create pairs
        const pairs = [];
        for (let i = 0; i < shuffledStudents.length; i += 2) {
            if (i + 1 < shuffledStudents.length) {
                pairs.push([shuffledStudents[i], shuffledStudents[i + 1]]);
            } else {
                // Odd number of students - last student gets a special "meet everyone" card
                pairs.push([shuffledStudents[i], 'Everyone']);
            }
        }

        // Display pairs with animation
        pairs.forEach((pair, index) => {
            setTimeout(() => {
                this.createPairCard(pair, index);
            }, index * 200);
        });
    }

    createPairCard(pair, index) {
        const pairCard = document.createElement('div');
        pairCard.className = 'pair-card';
        pairCard.style.animationDelay = `${index * 0.1}s`;

        if (pair[1] === 'Everyone') {
            pairCard.innerHTML = `
                <h3>🌟 Special Round 🌟</h3>
                <div class="student-numbers">
                    <div class="student-number">${pair[0]}</div>
                    <div class="vs-text">meets</div>
                    <div class="student-number special">ALL</div>
                </div>
            `;
        } else {
            pairCard.innerHTML = `
                <h3>Pair ${index + 1}</h3>
                <div class="student-numbers">
                    <div class="student-number">${pair[0]}</div>
                    <div class="vs-text">VS</div>
                    <div class="student-number">${pair[1]}</div>
                </div>
            `;
        }

        this.pairsContainer.appendChild(pairCard);
    }

    startTimer() {
        this.timeLeft = this.timePerRound * 60; // Convert to seconds
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.timerEnded();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Change color when time is running low
        if (this.timeLeft <= 30) {
            this.timerDisplay.style.color = '#FF0000';
            this.timerDisplay.style.animation = 'timerPulse 0.5s infinite';
        } else if (this.timeLeft <= 60) {
            this.timerDisplay.style.color = '#FF8C00';
        } else {
            this.timerDisplay.style.color = '#FF6B6B';
        }
    }

    timerEnded() {
        clearInterval(this.timer);
        this.timerDisplay.textContent = 'TIME\'S UP!';
        this.timerDisplay.style.color = '#FF0000';
        this.timerDisplay.style.animation = 'timerPulse 0.3s infinite';
        
        // Show next round button
        this.nextRoundBtn.style.display = 'inline-block';
        this.nextRoundBtn.style.animation = 'pulse 1s infinite';
        
        // Add some celebration effects
        this.addCelebrationEffects();
    }

    addCelebrationEffects() {
        // Add confetti effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 100);
        }
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '🎊', '⭐', '🪙', '🎈'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '2rem';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = 'confettiFall 3s linear forwards';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }

    nextRound() {
        if (this.currentRound >= this.totalRounds) {
            this.gameComplete();
            return;
        }

        this.currentRound++;
        this.updateRoundInfo();
        this.generatePairs();
        this.startTimer();
        
        this.nextRoundBtn.style.display = 'none';
    }

    gameComplete() {
        this.isGameActive = false;
        clearInterval(this.timer);
        
        this.timerDisplay.textContent = 'GAME COMPLETE!';
        this.timerDisplay.style.color = '#FFD700';
        this.timerDisplay.style.animation = 'rainbow 1s infinite';
        
        this.pairsContainer.innerHTML = `
            <div class="pair-card" style="grid-column: 1 / -1; text-align: center;">
                <h3>🎉 Congratulations! 🎉</h3>
                <p style="font-size: 1.2rem; margin: 20px 0; color: #006400;">
                    All rounds completed! Everyone has had a chance to meet!
                </p>
                <div style="font-size: 3rem; margin: 20px 0;">
                    🎮 🏆 🎊
                </div>
            </div>
        `;
        
        this.nextRoundBtn.style.display = 'none';
        
        // Big celebration
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 50);
        }
    }

    updateRoundInfo() {
        this.currentRoundSpan.textContent = this.currentRound;
        this.totalRoundsSpan.textContent = this.totalRounds;
    }

    resetGame() {
        this.isGameActive = false;
        clearInterval(this.timer);
        
        this.setupPanel.style.display = 'block';
        this.gamePanel.style.display = 'none';
        
        this.currentRound = 1;
        this.students = [];
        this.timeLeft = 0;
        
        this.timerDisplay.textContent = '2:30';
        this.timerDisplay.style.color = '#FF6B6B';
        this.timerDisplay.style.animation = 'timerPulse 1s infinite';
        
        this.nextRoundBtn.style.display = 'none';
        this.pairsContainer.innerHTML = '';
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new StudentMatchmaker();
});
