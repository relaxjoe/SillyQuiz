

let timerValue = 90;
const timerElement = document.getElementById('timer');

function startTimer() {
    const timerInterval = setInterval(() => {
        timerValue--;
        timerElement.textContent = timerValue;

        if (timerValue <= 0) {
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000);
}

startTimer();
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result');

    questionContainer.textContent = quizData[currentQuestion].question;
    optionsContainer.innerHTML = "";

    quizData[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    resultContainer.textContent = "";
}

function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
        score++;
    }

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultContainer = document.getElementById('result');
    resultContainer.textContent = `Your score is ${score} out of ${quizData.length}.`;
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

// Initial load
loadQuestion();
