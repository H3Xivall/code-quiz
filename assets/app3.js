// Coding Quiz

// Import Questions
import questions from './questions.js';

// Variable Declarations
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const startScreen = document.getElementById("start-screen");
const questionsScreen = document.getElementById("questions-screen");
const answerScreen = document.getElementById("answers");
const endScreen = document.getElementById("end-screen");
const footer = document.getElementById("footer");
const scoreScreen = document.getElementById("score");
const timerCountdown = 10 * 60;
const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const answerSheet = [];
let scoreCount = 0;
let clickCount = 0;
let currentAnswer = 0;
let onQuestion = 0;
let testActive = false;

// Page Content
startBtn.onclick = startQuiz;

// Functions
function startQuiz() {
    startScreen.classList.add("hide");
    questionsScreen.classList.remove("hide");
    footer.classList.remove("hide");
    let timer = timerCountdown;
    document.getElementById("timer").textContent = timer;
    testActive = true;
    console.log(`Quiz Started: ${timer} seconds left`);
    // Start Timer
    let countdown = setInterval(function() {
        timer--;
        document.getElementById("timer").textContent = timerFormat(timer);
        if (timer <= 0 || onQuestion >= questions.length) {
            clearInterval(countdown);
            endQuiz();
        };
    }, 1000);
    displayQuestion(onQuestion);
    // Previous Button Logic
    prevBtn.textContent = "Previous Question";
    if (onQuestion > 0) {
        prevBtn.onclick = prevQuestion;
    } else {
        prevBtn.onclick = null;
    };
    // Next Button Logic
    if (answerSheet[onQuestion] != undefined || clickCount == 1) {
        nextBtn.textContent = "Next Question";
        nextBtn.onclick = nextQuestion;
    } else {
        nextBtn.textContent = "Submit Answer";
        nextBtn.onclick = subAns(onQuestion);
    };
};
function endQuiz() {
    testActive = false;
    questionsScreen.classList.add("hide");
    footer.classList.add("hide");
    endScreen.classList.remove("hide");
    scoreScreen.textContent = scoreCount;
    console.log("The Quiz has ended");
};
function displayQuestion(i) {
    let q = questions[i].question;
    let a = questions[i].answers;
    document.getElementById("question").textContent = q;
    console.log(`Created Question ${i + 1} successfully`);
    // Create Answer Buttons
    for (let n = 0; n < a.length; n++) {
        let answer = document.createElement("button");
        answer.setAttribute("class", "answer");
        answer.setAttribute("id", `answer${n}`);
        answer.textContent = `${n + 1}) ${a[n].text}`;
        answer.onclick = function() {
            currentAnswer = n;
            console.log(`Answer ${n + 1} selected`);
        };
        answerScreen.appendChild(answer);
        console.log(`Created Answer ${n + 1} successfully`);
    };
    footer.textContent = `Question ${i + 1} of ${questions.length}`;
};
function prevQuestion() {
    if (onQuestion > 0) {
        onQuestion--;
        displayQuestion(onQuestion);
        console.log("Previous Question");
        currentAnswer = 0;
    } else {
        console.log("No Previous Questions");
        footer.textContent = "No Previous Questions";
    };
};
function nextQuestion() {
    currentAnswer = 0;
    if (onQuestion < questions.length) {
        onQuestion++;
        displayQuestion(onQuestion);
        clickCount = 0;
        console.log("Next Question");
    } else {
        endQuiz();
    }
};
function subAns(i) {
    let qSet = questions[i];
    let q = qSet.question;
    let a = qSet.answers;
    let clicked = document.getElementsByClassName("clicked");
    clickCount++;
    if (clicked.correct) {
        scoreCount++;
        answerSheet[i] = clicked.correct;
        console.log("Correct | Score: " + scoreCount);
        footer.textContent = "Correct!";
    } else if (!clicked.correct) {
        answerSheet[i] = clicked.correct;
        console.log("Incorrect | Score: " + scoreCount);
        footer.textContent = "Incorrect!";
    } else {
        answerSheet[i] = null;
        console.log("No Answer Submitted");
        footer.textContent = "No Answer Submitted";
    };
    console.log(`Answers Submitted: ${answerSheet}`);
};
function timerFormat(s) {
    let minutes = Math.floor(s / 60);
    let seconds = s % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    };
    return `${minutes}:${seconds}`;
};