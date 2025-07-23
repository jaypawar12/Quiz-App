const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"],
        answer: 1
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Mozilla", "Netscape", "Microsoft", "Apple"],
        answer: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "<!-- -->"],
        answer: 0
    },
    {
        question: "Which method is used to parse a JSON string in JavaScript?",
        options: ["JSON.parse()", "JSON.stringify()", "parseJSON()", "stringifyJSON()"],
        answer: 0
    },
    {
        question: "What is the output of 'typeof null' in JavaScript?",
        options: ["'null'", "'object'", "'undefined'", "'number'"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timer;
let timeLeft = 20;

// DOM
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const choicesDiv = document.getElementById("choices");
const nextBtn = document.getElementById("next-button");
const prevBtn = document.getElementById("prev-button");
const timerBubble = document.getElementById("timer-bubble");
const questionCounter = document.getElementById("question-counter");
const quizContainer = document.getElementById("quiz-container");

function startTimer() {
    clearInterval(timer);
    timeLeft = 20;
    timerBubble.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerBubble.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextBtn.click();
        }
    }, 1000);
}

function loadQuestion(index) {
    startTimer();
    const q = questions[index];
    document.getElementById('question-text').textContent = q.question;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    const labels = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "btn btn-outline-primary mt-2 w-100 text-start";
        btn.innerHTML = `<strong>${labels[i]}.</strong> ${opt}`;
        btn.onclick = () => selectOption(i, btn);
        choicesDiv.appendChild(btn);
    });
    questionCounter.textContent = `${index + 1} of ${questions.length} Questions`;
    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
}

function selectOption(index, btn) {
    selectedOption = index;
    const buttons = choicesDiv.querySelectorAll('button');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

nextBtn.onclick = () => {
    clearInterval(timer);
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        selectedOption = null;
        loadQuestion(currentQuestion);
    } else {
        showResult();
    }
};

prevBtn.onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        selectedOption = null;
        loadQuestion(currentQuestion);
    }
};

function showResult() {
    document.querySelector('.quiz-box').innerHTML = `
    <h2 class="text-success">Quiz Finished!</h2>
    <p>Your Score: <strong>${score} / ${questions.length}</strong></p>
    <button class="btn btn-primary" onclick="location.reload()">Restart Quiz</button>
  `;
}

// Start button logic
startBtn.onclick = () => {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    timerBubble.style.display = 'flex';
    loadQuestion(currentQuestion);
};
