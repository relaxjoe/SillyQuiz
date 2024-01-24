const quizData = [
  {
      question: "What is Ash Ketchum's Starter Pokemon?",
      options: ["Bulbasaur", "Squirtle", "Pikachu", "Charmander"],
      correctAnswer: "Pikachu"
  },
  {
      question: "Which planet is Mark Zukerberg from?",
      options: ["Earth", "Mars", "Krypton", "Titan"],
      correctAnswer: "Mars"
  },
  {
      question: "Whats the cutest?",
      options: ["Capybara", "Kitten", "You", "Puppy"],
      correctAnswer: "You"
  }
];

let currentQuestion = 0;
let score = 0;
let timerValue = 90;
let timerInterval;

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("start-button").addEventListener("click", startQuiz);
  document.getElementById("HS").addEventListener("click", viewHighscores);
  document.getElementById("reset-highscores").addEventListener("click", resetHighscores);
});


function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    questionContainer.textContent = quizData[currentQuestion].question;
    optionsContainer.innerHTML = "";

    quizData[currentQuestion].options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    let message = '';
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
        score++;
        message = 'Correct!';
    } else {
        timerValue -= 30;
        if (timerValue < 0) {
            timerValue = 0;
        }
        message = 'Wrong!';
    }

    showMessage(message);

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showMessage(msg) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = msg;
    messageElement.style.display = 'block';

    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 2000);
}

function showResult() {
    clearInterval(timerInterval);
    document.getElementById("quiz-container").style.display = "none";

    const playerName = prompt("Enter your name:");
    saveHighscore(playerName, score);

    displayHighscores();
    document.getElementById("highscore-container").style.display = "block";
}

function saveHighscore(name, score) {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ name, score });
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function displayHighscores() {
    const highscoreList = document.getElementById("highscore-list");
    highscoreList.innerHTML = "";

    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort((a, b) => b.score - a.score);

    highscores.forEach(highscore => {
        const listItem = document.createElement("li");
        listItem.textContent = `${highscore.name} - ${highscore.score} points`;
        highscoreList.appendChild(listItem);
    });
}

function startQuiz() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    startTimer();
    loadQuestion();
}

function startTimer() {
    timerElement = document.getElementById("timer");
    timerElement.textContent = timerValue;
    
    timerInterval = setInterval(() => {
        timerValue--;
        timerElement.textContent = timerValue;

        if (timerValue <= 0) {
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000);
}

function viewHighscores() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("highscore-container").style.display = "block";
    displayHighscores();
}

function resetHighscores() {
  console.log("Reset highscores clicked");
    localStorage.setItem("highscores", JSON.stringify([]));
    displayHighscores();
}