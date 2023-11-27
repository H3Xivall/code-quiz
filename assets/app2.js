// Coding Quiz

// Import Questions
// import questions from './questions1.js';

// Variable Declarations
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let scoreCount = 0;
const startScreen = document.getElementById("start-screen");
const questionsScreen = document.getElementById("questions-screen");
const answerScreen = document.getElementById("answers");
const endScreen = document.getElementById("end-screen");
const footer = document.getElementById("footer");
const questionCount = questions.length;
let onQuestion = 0;
const timerCountdown = 60;
const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
let questionAnswered = [];
let clickCount = 0;
let currentAnswer = 0;

// Page Content
startBtn.addEventListener("click", startQuiz);

prevBtn.textContent = "Previous Question";
prevBtn.onclick = prevQuestion;
// Next Button Logic
if (questionAnswered[onQuestion] != undefined || clickCount == 1) {
    nextBtn.textContent = "Next Question";
    nextBtn.onclick = nextQuestion;
} else {
    nextBtn.textContent = "Submit Answer";
    nextBtn.onclick = subQuestion(onQuestion, currentAnswer);
}


// Functions
function startQuiz() {
    console.log("Quiz Started")
    startScreen.classList.add("hide");
    questionsScreen.classList.remove("hide");
    footer.classList.remove("hide");
    startTimer();
    displayQuestion(onQuestion);
};
function startTimer() {
    let timer = timerCountdown;
    console.log(`Timer Started: ${timer} seconds`)
    let testMode = true;
    document.getElementById("timer").textContent = timer;
    let countdown = setInterval(function() {
        timer--;
        document.getElementById("timer").textContent = timer;
        if (timer <= 0 || onQuestion >= questionCount) {
            clearInterval(countdown);
            endQuiz();
        };
    }, 1000);
};
function endQuiz() {
    console.log("Quiz Ended");
    questionsScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    document.getElementById("score").textContent = scoreCount;
    footer.classList.add("hide");
};
function displayQuestion(i) {
    console.log(`Displaying Question ${i + 1}`);
    document.getElementById("question").textContent = questions[i].question;
    for (let n = 0; n < 4; n++) {
        const answerBtn = document.createElement("button");
        answerBtn.setAttribute("id", n);
        answerBtn.setAttribute("class", "answer");
        answerBtn.textContent = `${n + 1}) ${questions[i].answers[n].text}`;
        answerBtn.onclick = function() {
            currentAnswer = n;
            console.log(currentAnswer);
        };
        answerScreen.appendChild(answerBtn);
    };
};
function prevQuestion() {
    if (onQuestion > 0) {
        onQuestion--;
        displayQuestion(onQuestion);
    } else {
        console.log("No Previous Questions");
    };
};
function nextQuestion() {
    if (onQuestion < questionCount) {
        console.log("Next Question");
        onQuestion++;
        displayQuestion(onQuestion);
        clickCount = 0;
    } else {
        console.log("No More Questions");
    };
};
function subQuestion(i, n) {
    questionAnswered[i] = questions[i].answers[n].correct;
    clickCount++;
    console.log("Question Submitted : " + questionAnswered[i]);
    if (questionAnswered[i] == true) {
        scoreCount++;
        console.log("Score: " + scoreCount);
        footer.textContent = "Correct!";
    } else if (questionAnswered[i] == false) {
        footer.textContent = "Incorrect!";
    } else {
        footer.textContent = "";
    }
};