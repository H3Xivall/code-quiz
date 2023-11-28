// Coding Quiz
// Import Questions
import questions from './questions.js';

// Variable Declarations
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const startScreen = document.getElementById("start-screen");
const questionsScreen = document.getElementById("questions-screen");
const questionText = document.getElementById("question");
const answerScreen = document.getElementById("answers");
const endScreen = document.getElementById("end-screen");
const footer = document.getElementById("footer");
const scoreScreen = document.getElementById("score");
const timerCountDown = 600;
const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const submitBtn = document.getElementById("submit");
const hsBtn = document.getElementById("highscores");
const answerSheet = [];
let scoreCount = 0;
let onQuestion = 0;
let pickedAnswer = 'false';
let clickCount = 0;

// Page Content
document.addEventListener("DOMContentLoaded", startScreenFunc);

// Functions
function startQuiz() {
    // Starts the quiz and deploys the questions screen
    startScreen.classList.add("hide");
    questionsScreen.classList.remove("hide");
    footer.classList.remove("hide");
    genQA(onQuestion);
    clock(timerCountDown);
    footer.textContent = "Quiz Started";
    console.log("Quiz Started");
};
function endQuiz() {
    saveScore();
    clearScreen();
    questionsScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    scoreScreen.textContent = `Your score is ${scoreCount}`;
    createButton("submit");
};
function prevQuestion() {
    if (onQuestion === 0) {
        console.log("This is the first question");
    } else {
        clearScreen();
        onQuestion--;
        genQA(onQuestion);
        console.log('Previous Question');
    };
};
function nextQuestion() {
    if (onQuestion === questions.length -1) {
        clearScreen();
        endQuiz();
        console.log("End of Quiz");
    } else {
        clearScreen();
        answerSheet[onQuestion] = pickedAnswer;
        if (pickedAnswer === 'true') {
            footer.textContent = "Correct! Next Question";
        } else {
            footer.textContent = "Wrong! Next Question";
        };
        pickedAnswer = 'false';
        onQuestion++;
        genQA(onQuestion);
        console.log('Next Question');
    };
};
function clock(time) {
    let timer = time;
    let tFor = timerFormat(timer);
    let timePrint = document.getElementById("timer");
    timePrint.textContent = tFor;
    let interval = setInterval(function() {
        timer--;
        timePrint.textContent = timerFormat(timer);
        if (timer <= 0) {
            clearInterval(interval);
            endQuiz();
        };
    }, 1000);
};
function timerFormat(input) {
    let minutes = Math.floor(input / 60);
    let seconds = input % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    };
    return `${minutes}:${seconds}`;
};
function genQA(i) {
    displayQuestion(i);
    for (let n = 0; n < questions[i].answers.length; n++) {
        createButton("ans", i, n);
    };
    createButton("prev");
    createButton("next");
    console.log(`Question ${i + 1} and Answers Loaded`);
};
function clearScreen() {
    questionText.textContent = "";
    answerScreen.textContent = "";
    footer.textContent = "";
    nextBtn.textContent = "";
    prevBtn.textContent = "";
    submitBtn.textContent = "";
};
function displayQuestion(i) {
    let question = questions[i].question;
    questionText.textContent = question;
    questionText.setAttribute("id", `Q${i + 1}`);
    console.log(`${questionText.id}: ${question} - Rendered`);
};
// function displayAnswers() {
//     if (answerScreen.getAttribute("data-correct") === "true") {
//         this.getAttribute("data-correct").style.backgroundColor = "green";
//     } else {
//         this.getAttribute("data-correct").style.backgroundColor = "red";
//     };
// };
function checkAnswer(i) {
    let correct = this.getAttribute("data-correct");
    pickedAnswer = correct;
    console.log(`This answer is ${correct}`);
};
function highScore(type) {
    if (type === "submit") {
        let initials = document.getElementById("initials").value;
        let score = {
            score: scoreCount,
            initials: initials
        };
        highScores.push(score);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    } else if (type === "drpdwn") {
        const sortedScores = highScores.sort((a, b) => b.score - a.score);
        sortedScores.forEach((score, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = `${score.initials}: ${score.score}`;
            hsBtn.appendChild(option);
        });
    };
};
function saveScore() {
    answerSheet.forEach((answer, i) => {
        if (answer === 'true') {
            scoreCount++;
        };
    });
    console.log(`Score Tallied: ${scoreCount} of ${questions.length} correct`);
};
function createButton(type, u, z) {
    const btn = document.createElement("button");
    const drpD = document.createElement("select");
    if (type === "next") {
        btn.textContent = "Next Question";
        btn.onclick = nextQuestion;
        btn.classList.add("btn");
        nextBtn.appendChild(btn);
    } else if (type === "prev") {
        btn.textContent = "Previous Question";
        btn.onclick = prevQuestion;
        btn.classList.add("btn");
        prevBtn.appendChild(btn);
    } else if (type === "submit") {
        submitBtn.textContent = "Save Score";
        submitBtn.onclick = highScore("submit");
    } else if (type === "start") {
        btn.textContent = "Start Quiz";
        btn.onclick = startQuiz;
        btn.classList.add("btn");
        startBtn.appendChild(btn);
    } else if (type === "ans") {
        let answer = questions[u].answers[z].text;
        btn.textContent = answer;
        btn.classList.add("btn");
        btn.classList.add("ans");
        btn.setAttribute("data-correct", questions[u].answers[z].correct);
        btn.setAttribute("id", `answer-${z}`);
        btn.onclick = checkAnswer;
        answerScreen.appendChild(btn);
    } else if (type === "hs") {
        drpD.textContent = "High Scores";
        drpD.onclick = highScore("drpdwn");
        drpD.setAttribute("id", "highscore-dropdown");
        drpD.classList.add("btn");
        hsBtn.appendChild(drpD);
    }
};
function startScreenFunc() {
    createButton("start");
    createButton("hs");
    console.log("Start Screen Loaded");
};