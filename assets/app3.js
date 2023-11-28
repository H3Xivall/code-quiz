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
const answerSheet = [];
let scoreCount = 0;
let onQuestion = 0;
let pickedAnswer = 'false';

// Page Content
document.body.onload = function () {
    console.log(`
    Welcome to the Coding Quiz!
    You will have 10 minutes to complete the quiz.
    You will be given 10 questions.
    Each question will have 4 possible answers.
    Good Luck!
    `);
    document.getElementById("highscores").onclick = highScore;
};


startBtn.onclick = startQuiz;

// Functions
function startQuiz() {
    // Starts the quiz and deploys the questions screen
    startScreen.classList.add("hide");
    questionsScreen.classList.remove("hide");
    footer.classList.remove("hide");
    console.log("Quiz Started");
    footer.textContent = "Quiz Started";
    clock(timerCountDown);
    genQA(onQuestion)
};
function prevQuestion() {
    // Goes to the previous question
    if (onQuestion === 0) {
        console.log("This is the first question");
    } else {
        clearScreen();
        onQuestion--;
        console.log('Previous Question');
        genQA(onQuestion);
    }
};
function nextQuestion() {
    // Goes to the next question
    if (onQuestion === questions.length - 1) {
        clearScreen();
        endQuiz();
        console.log("This is the last question");
    } else {
        clearScreen();
        answerSheet[onQuestion] = pickedAnswer;
        onQuestion++;
        console.log('Next Question');
        genQA(onQuestion);
        pickedAnswer = 'false';
        console.log(answerSheet);
    };
};
function endQuiz() {
    // Ends the quiz and deploys the end screen
    questionsScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    footer.textContent = "Quiz Ended";
    scoreFormat(end);
    createButton("submit");
};
function clock(time) {
    // Starts the quiz timer
    let timer = time;
    let tFor = timerFormat(timer);
    let timePrint = document.getElementById("timer");
    timePrint.textContent = tFor;
    console.log(`Quiz started: ${tFor} time left`);
    // Start Timer
    let timeInterval = setInterval(function () {
        timer--;
        tFor = timerFormat(timer);
        document.getElementById("timer").textContent = tFor;
        if (timer <= 0) {
            clearInterval(timeInterval);
            endQuiz();
        };
    }, 1000);
};
function timerFormat(input) {
    // Formats Timer into MM:SS
    let minutes = Math.floor(input / 60);
    let seconds = input % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    };
    return `${minutes}:${seconds}`;
};
function displayQuestion(i) {
    // Creates Question
    let question = questions[i].question;
    questionText.textContent = question;
    questionText.setAttribute("id", `Q${i + 1}`);
    console.log(`${questionText.id}: Rendered`);
    console.log(question);
};
function displayAnswers(i, n) {
    // Creates Answer Buttons
    let answer = questions[i].answers[n].text;
    let ansBtn = document.createElement("button");
    ansBtn.textContent = answer;
    ansBtn.classList.add("btn");
    ansBtn.setAttribute("data-correct", questions[i].answers[n].correct);
    ansBtn.setAttribute("id", `answer-${n}`);
    ansBtn.onclick = checkAnswer;
    answerScreen.appendChild(ansBtn);
};
function checkAnswer() {
    // Checks Answer
    let correct = this.getAttribute("data-correct");
    console.log(`The answer is ${correct}`);
    pickedAnswer = correct;
    console.log(`Picked Answer: ${pickedAnswer}`);
};
function scoreFormat(i) {
    if (i === end) {
        answerSheet.forEach(function (item, index) {
            if (item === 'true') {
                scoreCount++;
            }
        });
        scoreScreen.textContent = `Your Score is ${scoreCount} out of ${questions.length}`;
    } else {
        let initials = document.getElementById("initials").value;
        const newScore = {
            initials: initials,
            score: scoreCount
        };
        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    };
};
function genQA(i) {
    // Generates Question and Answers and Buttons
    displayQuestion(i);
    for (let j = 0; j < 4; j++) {
        displayAnswers(i, j);
        console.log(`Generated Answer ${j + 1}: ${questions[i].answers[j].text}`);
    };
    createButton("prev");
    createButton("next");
};
function createButton(text) {
    // Creates My Buttons because I am lazy
    const btn = document.createElement("button");
    if (text === "next") {
        btn.textContent = "Next";
        btn.onclick = nextQuestion;
        nextBtn.appendChild(btn);
    } else if (text === "prev") {
        btn.textContent = "Previous";
        btn.onclick = prevQuestion;
        prevBtn.appendChild(btn);
    } else if (text === "submit") {
        btn.textContent = "Save Score";
        btn.onclick = scoreFormat;
        submitBtn.appendChild(btn);
    };
};
function clearScreen() {
    // Clears the Screen
    questionText.textContent = "";
    answerScreen.textContent = "";
    nextBtn.textContent = "";
    prevBtn.textContent = "";
    submitBtn.textContent = "";
}
function highScore() {
    const hLink = document.getElementById("highscores");
    hLink.setAttribute("href", "#");

    // Sort high scores from highest to lowest
    const sortedScores = highScores.sort((a, b) => b.score - a.score);

    // Create a dropdown element
    const dropdown = document.createElement("select");

    // Add an option for each high score
    sortedScores.forEach((score, index) => {
        const option = document.createElement("option");
        option.text = `${index + 1}. ${score.name}: ${score.score}`;
        dropdown.add(option);
    });

    // Display the dropdown
    alert("High Scores:");
    alert(dropdown.innerHTML);
}