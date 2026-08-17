// Interactive Cross-Platform Quiz Application Logic with Vector Signal Wave Generator

document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentQuestions = [...questionsData];
    let currentIndex = 0;
    let userAnswers = JSON.parse(localStorage.getItem('midterm_quiz_answers') || '{}');
    let flaggedQuestions = new Set(JSON.parse(localStorage.getItem('midterm_quiz_flags') || '[]'));
    let mode = 'practice';
    let isExamSubmitted = false;
    let timerInterval = null;
    let timerSeconds = 0;

    // Touch Swipe State
    let touchStartX = 0;
    let touchEndX = 0;

    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const drawerToggle = document.getElementById('drawerToggle');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const gridSection = document.getElementById('gridSection');

    const modePractice = document.getElementById('modePractice');
    const modeExam = document.getElementById('modeExam');
    const chapterFilter = document.getElementById('chapterFilter');
    const questionCounter = document.getElementById('questionCounter');
    const chapBadge = document.getElementById('chapBadge');
    const timerDisplay = document.getElementById('timerDisplay');
    const progressBar = document.getElementById('progressBar');

    const questionCard = document.getElementById('touchCardArea');
    const questionText = document.getElementById('questionText');
    const imageContainer = document.getElementById('imageContainer');
    const questionImage = document.getElementById('questionImage');

    const svgWaveContainer = document.getElementById('svgWaveContainer');
    const svgWaveGraphic = document.getElementById('svgWaveGraphic');

    const optionsContainer = document.getElementById('optionsContainer');
    const explanationBox = document.getElementById('explanationBox');
    const expResultBadge = document.getElementById('expResultBadge');
    const explanationText = document.getElementById('explanationText');

    // Desktop Nav
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const flagBtn = document.getElementById('flagBtn');
    const submitExamBtn = document.getElementById('submitExamBtn');

    // Mobile Nav
    const mPrevBtn = document.getElementById('mPrevBtn');
    const mNextBtn = document.getElementById('mNextBtn');
    const mFlagBtn = document.getElementById('mFlagBtn');

    const questionGridNav = document.getElementById('questionGridNav');

    // Modals
    const scoreModal = document.getElementById('scoreModal');
    const finalScoreText = document.getElementById('finalScoreText');
    const scorePercent = document.getElementById('scorePercent');
    const scoreGradeMsg = document.getElementById('scoreGradeMsg');
    const statCorrect = document.getElementById('statCorrect');
    const statWrong = document.getElementById('statWrong');
    const statSkipped = document.getElementById('statSkipped');
    const reviewExamBtn = document.getElementById('reviewExamBtn');
    const restartExamBtn = document.getElementById('restartExamBtn');

    const imgZoomModal = document.getElementById('imgZoomModal');
    const zoomedImg = document.getElementById('zoomedImg');
    const closeImgZoom = document.getElementById('closeImgZoom');

    // Theme Persistence
    const savedTheme = localStorage.getItem('midterm_quiz_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') !== 'light';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('midterm_quiz_theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
    });

    // Mobile Drawer Toggle
    if (drawerToggle) {
        drawerToggle.addEventListener('click', () => gridSection.classList.add('open'));
    }
    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', () => gridSection.classList.remove('open'));
    }

    // Mode Switches
    modePractice.addEventListener('click', () => switchMode('practice'));
    modeExam.addEventListener('click', () => switchMode('exam'));

    function switchMode(newMode) {
        mode = newMode;
        if (mode === 'practice') {
            modePractice.classList.add('active');
            modeExam.classList.remove('active');
            timerDisplay.classList.add('hidden');
            if (submitExamBtn) submitExamBtn.classList.add('hidden');
            stopTimer();
        } else {
            modeExam.classList.add('active');
            modePractice.classList.remove('active');
            timerDisplay.classList.remove('hidden');
            if (submitExamBtn) submitExamBtn.classList.remove('hidden');
            resetQuiz();
            startTimer();
        }
        renderQuestion();
        renderGrid();
    }

    // Timer
    function startTimer() {
        stopTimer();
        timerSeconds = 0;
        timerInterval = setInterval(() => {
            timerSeconds++;
            const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
            const secs = String(timerSeconds % 60).padStart(2, '0');
            timerDisplay.textContent = `⏱️ ${mins}:${secs}`;
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) clearInterval(timerInterval);
    }

    // Filter by Chapter
    chapterFilter.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'all') {
            currentQuestions = [...questionsData];
        } else {
            currentQuestions = questionsData.filter(q => q.chapter === val);
        }
        currentIndex = 0;
        userAnswers = {};
        isExamSubmitted = false;
        renderQuestion();
        renderGrid();
    });

    // SVG Signal Wave Graphic Generator
    function generateSignalSVG(q) {
        const text = (q.question + ' ' + q.explanation).toLowerCase();
        
        let svg = '';
        if (text.includes('ask') || text.includes('amplitude shift keying')) {
            svg = `<svg viewBox="0 0 500 80">
                <text x="10" y="15" fill="#38bdf8" font-size="12">Bit Stream: 1 0 1 0</text>
                <path d="M 10 50 Q 20 30 30 50 T 50 50 T 70 50 T 90 50 M 90 50 L 170 50 M 170 50 Q 180 30 190 50 T 210 50 T 230 50 T 250 50 M 250 50 L 330 50" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
                <line x1="10" y1="50" x2="350" y2="50" stroke="#475569" stroke-dasharray="3,3"/>
                <text x="360" y="55" fill="#94a3b8" font-size="12">ASK Modulation</text>
            </svg>`;
        } else if (text.includes('fsk') || text.includes('frequency shift keying')) {
            svg = `<svg viewBox="0 0 500 80">
                <text x="10" y="15" fill="#34d399" font-size="12">High Freq (Bit 1) vs Low Freq (Bit 0)</text>
                <path d="M 10 50 Q 15 30 20 50 T 30 50 T 40 50 T 50 50 T 60 50 T 70 50 T 80 50 M 80 50 Q 95 30 110 50 T 140 50 T 170 50 M 170 50 Q 175 30 180 50 T 190 50 T 200 50 T 210 50 T 220 50 T 230 50 T 240 50" stroke="#34d399" stroke-width="2.5" fill="none"/>
                <line x1="10" y1="50" x2="350" y2="50" stroke="#475569" stroke-dasharray="3,3"/>
                <text x="360" y="55" fill="#94a3b8" font-size="12">FSK Modulation</text>
            </svg>`;
        } else if (text.includes('psk') || text.includes('phase shift keying')) {
            svg = `<svg viewBox="0 0 500 80">
                <text x="10" y="15" fill="#818cf8" font-size="12">Phase Reversal 180° at Bit Change</text>
                <path d="M 10 50 Q 20 30 30 50 T 50 50 T 70 50 M 70 50 Q 80 70 90 50 T 110 50 T 130 50 M 130 50 Q 140 30 150 50 T 170 50" stroke="#818cf8" stroke-width="2.5" fill="none"/>
                <line x1="70" y1="20" x2="70" y2="70" stroke="#fbbf24" stroke-dasharray="2,2"/>
                <text x="360" y="55" fill="#94a3b8" font-size="12">PSK Modulation</text>
            </svg>`;
        } else if (text.includes('unipolar') || text.includes('polar') || text.includes('bipolar') || text.includes('line coding')) {
            svg = `<svg viewBox="0 0 500 80">
                <text x="10" y="15" fill="#fbbf24" font-size="12">Line Coding: Unipolar (+V, 0) | Polar (+V, -V) | Bipolar (+V, 0, -V)</text>
                <path d="M 10 20 L 70 20 L 70 60 L 130 60 L 130 20 L 190 20 L 190 40 L 250 40 L 250 60 L 310 60" stroke="#fbbf24" stroke-width="2.5" fill="none"/>
                <line x1="10" y1="40" x2="350" y2="40" stroke="#475569" stroke-dasharray="3,3"/>
                <text x="360" y="45" fill="#94a3b8" font-size="12">Digital Voltage</text>
            </svg>`;
        } else if (text.includes('am (amplitude') || text.includes('fm (frequency') || text.includes('pm (phase')) {
            svg = `<svg viewBox="0 0 500 80">
                <text x="10" y="15" fill="#38bdf8" font-size="12">Analog Modulation Carrier Wave</text>
                <path d="M 10 40 Q 20 15 30 40 T 50 40 T 70 40 Q 80 25 90 40 T 110 40 T 130 40 Q 140 10 150 40 T 170 40 T 190 40" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
                <line x1="10" y1="40" x2="350" y2="40" stroke="#475569" stroke-dasharray="3,3"/>
                <text x="360" y="45" fill="#94a3b8" font-size="12">Analog Carrier</text>
            </svg>`;
        }

        return svg;
    }

    // Render Question
    function renderQuestion() {
        if (currentQuestions.length === 0) return;
        const q = currentQuestions[currentIndex];

        questionCounter.textContent = `ข้อที่ ${currentIndex + 1} / ${currentQuestions.length}`;
        chapBadge.textContent = q.chapter.split(':')[0];
        progressBar.style.width = `${((currentIndex + 1) / currentQuestions.length) * 100}%`;

        questionText.textContent = `ข้อที่ ${q.id}. ${q.question}`;

        // Image Container
        if (q.image) {
            imageContainer.classList.remove('hidden');
            questionImage.src = `media/${q.image}`;
        } else {
            imageContainer.classList.add('hidden');
        }

        // SVG Signal Wave Graphic
        const svgCode = generateSignalSVG(q);
        if (svgCode) {
            svgWaveContainer.classList.remove('hidden');
            svgWaveGraphic.innerHTML = svgCode;
        } else {
            svgWaveContainer.classList.add('hidden');
        }

        // Image Zoom Event
        questionImage.onclick = () => {
            zoomedImg.src = questionImage.src;
            imgZoomModal.classList.remove('hidden');
        };

        // Choices Render
        optionsContainer.innerHTML = '';
        const userSel = userAnswers[q.id];

        q.options.forEach((optText, optIdx) => {
            const card = document.createElement('div');
            card.className = 'option-card';

            if (userSel === optIdx) {
                card.classList.add('selected');
            }

            if ((mode === 'practice' && userSel !== undefined) || (mode === 'exam' && isExamSubmitted)) {
                if (optIdx === q.answer) {
                    card.classList.add('correct');
                } else if (userSel === optIdx && optIdx !== q.answer) {
                    card.classList.add('wrong');
                }
            }

            card.innerHTML = `<span>${optText}</span>`;

            card.addEventListener('click', () => handleOptionSelect(q, optIdx));
            optionsContainer.appendChild(card);
        });

        // Explanation Box
        if ((mode === 'practice' && userSel !== undefined) || (mode === 'exam' && isExamSubmitted)) {
            explanationBox.classList.remove('hidden');
            explanationText.textContent = q.explanation;

            if (userSel === q.answer) {
                expResultBadge.textContent = 'ถูกต้อง!';
                expResultBadge.className = 'exp-badge correct';
            } else if (userSel === undefined) {
                expResultBadge.textContent = 'ไม่ได้ทำ';
                expResultBadge.className = 'exp-badge wrong';
            } else {
                expResultBadge.textContent = 'ตอบผิด!';
                expResultBadge.className = 'exp-badge wrong';
            }
        } else {
            explanationBox.classList.add('hidden');
        }

        // Flag State Update
        const isFlagged = flaggedQuestions.has(q.id);
        updateFlagButtons(isFlagged);

        // Nav Buttons State
        updateNavButtonsState();
        updateGridState();
    }

    function handleOptionSelect(q, optIdx) {
        if (mode === 'exam' && isExamSubmitted) return;

        userAnswers[q.id] = optIdx;
        localStorage.setItem('midterm_quiz_answers', JSON.stringify(userAnswers));

        renderQuestion();
        renderGrid();
    }

    function updateFlagButtons(isFlagged) {
        [flagBtn, mFlagBtn].forEach(btn => {
            if (!btn) return;
            if (isFlagged) {
                btn.classList.add('flagged');
                btn.textContent = '🚩 ปักหมุดแล้ว';
            } else {
                btn.classList.remove('flagged');
                btn.textContent = '🔖 ปักหมุดทบทวน';
            }
        });
    }

    function toggleFlag() {
        const q = currentQuestions[currentIndex];
        if (flaggedQuestions.has(q.id)) {
            flaggedQuestions.delete(q.id);
        } else {
            flaggedQuestions.add(q.id);
        }
        localStorage.setItem('midterm_quiz_flags', JSON.stringify(Array.from(flaggedQuestions)));
        renderQuestion();
        renderGrid();
    }

    if (flagBtn) flagBtn.addEventListener('click', toggleFlag);
    if (mFlagBtn) mFlagBtn.addEventListener('click', toggleFlag);

    function nextQuestion() {
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            renderQuestion();
        }
    }

    function prevQuestion() {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    }

    [nextBtn, mNextBtn].forEach(b => b && b.addEventListener('click', nextQuestion));
    [prevBtn, mPrevBtn].forEach(b => b && b.addEventListener('click', prevQuestion));

    function updateNavButtonsState() {
        const isFirst = currentIndex === 0;
        const isLast = currentIndex === currentQuestions.length - 1;

        if (prevBtn) prevBtn.disabled = isFirst;
        if (mPrevBtn) mPrevBtn.disabled = isFirst;
        if (nextBtn) nextBtn.disabled = isLast;
        if (mNextBtn) mNextBtn.disabled = isLast;
    }

    // Touch Swipe Gestures
    if (questionCard) {
        questionCard.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        questionCard.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleTouchSwipe();
        }, { passive: true });
    }

    function handleTouchSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (swipeDistance < -50) {
            nextQuestion(); // Swipe left -> Next
        } else if (swipeDistance > 50) {
            prevQuestion(); // Swipe right -> Prev
        }
    }

    // Grid Navigation
    function renderGrid() {
        questionGridNav.innerHTML = '';
        currentQuestions.forEach((q, idx) => {
            const btn = document.createElement('button');
            btn.className = 'grid-btn';
            btn.textContent = idx + 1;

            if (idx === currentIndex) btn.classList.add('active');

            const userSel = userAnswers[q.id];
            if (userSel !== undefined) {
                btn.classList.add('answered');
            }

            if ((mode === 'practice' && userSel !== undefined) || (mode === 'exam' && isExamSubmitted)) {
                if (userSel === q.answer) {
                    btn.classList.remove('answered');
                    btn.classList.add('correct');
                } else if (userSel !== undefined) {
                    btn.classList.remove('answered');
                    btn.classList.add('wrong');
                }
            }

            if (flaggedQuestions.has(q.id)) {
                btn.classList.add('flagged');
            }

            btn.addEventListener('click', () => {
                currentIndex = idx;
                gridSection.classList.remove('open');
                renderQuestion();
            });

            questionGridNav.appendChild(btn);
        });
    }

    function updateGridState() {
        const buttons = questionGridNav.children;
        for (let i = 0; i < buttons.length; i++) {
            if (i === currentIndex) {
                buttons[i].classList.add('active');
            } else {
                buttons[i].classList.remove('active');
            }
        }
    }

    // Submit Exam
    if (submitExamBtn) {
        submitExamBtn.addEventListener('click', () => {
            if (confirm('คุณต้องการส่งข้อสอบใช่หรือไม่?')) {
                finishExam();
            }
        });
    }

    function finishExam() {
        stopTimer();
        isExamSubmitted = true;

        let correct = 0;
        let wrong = 0;
        let skipped = 0;

        currentQuestions.forEach(q => {
            const sel = userAnswers[q.id];
            if (sel === undefined) {
                skipped++;
            } else if (sel === q.answer) {
                correct++;
            } else {
                wrong++;
            }
        });

        const total = currentQuestions.length;
        const percent = Math.round((correct / total) * 100);

        finalScoreText.textContent = `${correct} / ${total}`;
        scorePercent.textContent = `${percent}%`;
        statCorrect.textContent = correct;
        statWrong.textContent = wrong;
        statSkipped.textContent = skipped;

        if (percent >= 80) {
            scoreGradeMsg.textContent = '🌟 ยอดเยี่ยมมาก! พร้อมสอบ Midterm เกรด A แน่นอน!';
        } else if (percent >= 60) {
            scoreGradeMsg.textContent = '👍 ทำได้ดี! ลองทบทวนข้อที่ตอบผิดเพิ่มเติมครับ';
        } else {
            scoreGradeMsg.textContent = '💪 พยายามอีกนิด! กลับไปทบทวนเนื้อหาแล้วลองทำใหม่อีกครั้ง';
        }

        scoreModal.classList.remove('hidden');
        renderQuestion();
        renderGrid();
    }

    // Modal Actions
    reviewExamBtn.addEventListener('click', () => scoreModal.classList.add('hidden'));

    restartExamBtn.addEventListener('click', () => {
        scoreModal.classList.add('hidden');
        resetQuiz();
        if (mode === 'exam') startTimer();
        renderQuestion();
        renderGrid();
    });

    function resetQuiz() {
        userAnswers = {};
        localStorage.removeItem('midterm_quiz_answers');
        isExamSubmitted = false;
        currentIndex = 0;
    }

    // Zoom Modal Close
    closeImgZoom.addEventListener('click', () => imgZoomModal.classList.add('hidden'));
    imgZoomModal.addEventListener('click', (e) => {
        if (e.target === imgZoomModal) imgZoomModal.classList.add('hidden');
    });

    // Init
    renderGrid();
    renderQuestion();
});
