document.addEventListener('DOMContentLoaded', function() {
    let selectedTime = 2;
    let currentWordIndex = 0;
    let focusWords = ['Talking', 'Imaging', 'Local', 'Global', 'All'];
    let sessionTimer;
    let timeRemaining;
    let isPaused = false;

    // Timer selection
    document.querySelectorAll('.timer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.timer-btn').forEach(b => {
                b.classList.remove('bg-obsidian-accent', 'border-obsidian-accent', 'text-white');
                b.classList.add('bg-obsidian-800', 'border-obsidian-600');
            });
            btn.classList.remove('bg-obsidian-800', 'border-obsidian-600');
            btn.classList.add('bg-obsidian-accent', 'border-obsidian-accent', 'text-white');
            selectedTime = parseInt(btn.dataset.time);
        });
    });

    // Focus word editing
    document.querySelectorAll('.focus-word-item input').forEach((input, index) => {
        input.addEventListener('blur', () => {
            focusWords[index] = input.value;
        });
    });

    // Start session
    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('home-page').classList.add('hidden');
        document.getElementById('session-page').classList.remove('hidden');
        startSession();
    });

    // Session controls
    document.getElementById('pause-btn').addEventListener('click', () => {
        if (isPaused) {
            resumeSession();
        } else {
            pauseSession();
        }
    });

    document.getElementById('end-btn').addEventListener('click', () => {
        endSession();
    });

    // Word navigation
    document.getElementById('prev-word').addEventListener('click', () => {
        currentWordIndex = (currentWordIndex - 1 + focusWords.length) % focusWords.length;
        updateCurrentWord();
    });

    document.getElementById('next-word').addEventListener('click', () => {
        currentWordIndex = (currentWordIndex + 1) % focusWords.length;
        updateCurrentWord();
    });

    function startSession() {
        timeRemaining = selectedTime * 60;
        currentWordIndex = 1; // Start with "Imaging"
        updateCurrentWord();
        updateTimer();
        sessionTimer = setInterval(updateTimer, 1000);
    }

    function pauseSession() {
        clearInterval(sessionTimer);
        isPaused = true;
        document.getElementById('pause-btn').innerHTML = '<i class="fa-solid fa-play text-obsidian-400"></i>';
    }

    function resumeSession() {
        sessionTimer = setInterval(updateTimer, 1000);
        isPaused = false;
        document.getElementById('pause-btn').innerHTML = '<i class="fa-solid fa-pause text-obsidian-400"></i>';
    }

    function endSession() {
        clearInterval(sessionTimer);
        document.getElementById('session-page').classList.add('hidden');
        document.getElementById('home-page').classList.remove('hidden');
        isPaused = false;
        document.getElementById('pause-btn').innerHTML = '<i class="fa-solid fa-pause text-obsidian-400"></i>';
    }

    function updateTimer() {
        if (timeRemaining <= 0) {
            clearInterval(sessionTimer);
            flashScreen();
            setTimeout(endSession, 1000);
            return;
        }

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('countdown').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        timeRemaining--;
    }

    function updateCurrentWord() {
        document.getElementById('current-word').textContent = focusWords[currentWordIndex];
    }

    function flashScreen() {
        document.getElementById('session-page').classList.add('flash-screen');
        setTimeout(() => {
            document.getElementById('session-page').classList.remove('flash-screen');
            setTimeout(() => {
                document.getElementById('session-page').classList.add('flash-screen');
                setTimeout(() => {
                    document.getElementById('session-page').classList.remove('flash-screen');
                }, 300);
            }, 200);
        }, 300);
    }
});
