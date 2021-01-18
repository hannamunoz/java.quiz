const questions = [
    {
        question: "What is the HTML tag in which Javascript code can be written under?",
        answer1: "&lt;javascript&gt;",
        answer2: "&lt;script&gt;",
        answer3: "&lt;scripted&gt;",
        answer4: "&lt;java&gt;",
        correct: "2"
    },
    {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        answer1: "last()",
        answer2: "end()",
        answer3: "push()",
        answer4: "merge()",
        correct: "3"
    },
    {
        question: "Which of the following function of Array object calls a function for each element in the array?",
        answer1: "each()",
        answer2: "reach()",
        answer3: "returnEach()",
        answer4: "forEach()",
        correct: "4"
    },
    {
        question: "Which option would create an alert box with the message 'Warning!'?",
        answer1: "alert(Warning!)",
        answer2: "msgbox(Warning!)",
        answer3: "alertbox(Warning!)",
        answer4: "warning(alert)",
        correct: "1"
    },
    {
        question: "How would you write a function with the name 'myFunction'?",
        answer1: "myFunction(function)",
        answer2: "function = myFunction()",
        answer3: "function myFunction()",
        answer4: "(myFunction) function:",
        correct: "3"
    }
]

let lastQuestionIndex = questions.length - 1;
let currentQuestionIndex = 0;
let score = 75;
let timer;


function startQuiz() {
    currentQuestionIndex = 0;
    document.getElementById("quiz-intro").style.display = 'none';
    document.getElementById("quiz-questions").style.display = 'inline';
    startTimer();
    document.getElementById("score").style.display = 'block';
    renderQuestion();
}

function renderQuestion() {
    let q = questions[currentQuestionIndex];
    document.getElementById("question").innerHTML = questions[currentQuestionIndex].question;
    document.getElementById("answer1").innerHTML = questions[currentQuestionIndex].answer1;
    document.getElementById("answer2").innerHTML = questions[currentQuestionIndex].answer2;
    document.getElementById("answer3").innerHTML = questions[currentQuestionIndex].answer3;
    document.getElementById("answer4").innerHTML = questions[currentQuestionIndex].answer4;
}

function checkQuestion(answer) {
    if (questions[currentQuestionIndex].correct === answer) {
        currentQuestionIndex++;
    } else {
        score = score - 15;
        currentQuestionIndex++;
    }
    if (currentQuestionIndex > lastQuestionIndex) {
        endGame();
    } else {
        renderQuestion();
    }
}

function startTimer() {
    score = 75;
    timer = setInterval(function () {
        document.getElementById("score").innerHTML = 'Time:' + score;
        score--;
        if (score <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    document.getElementById("score").innerHTML = 'Time:' + score;
    document.getElementById("quiz-end").style.display = 'inline';
    document.getElementById("quiz-questions").style.display = 'none';
    document.getElementById("your-score").innerHTML = 'Your Score: ' + score;
}

function submitScore() {
    document.getElementById("quiz-end").style.display = 'none';
    document.getElementById("highscore").style.display = 'inline';
    document.getElementById("score").style.display = 'none';
    let highScores = localStorage.getItem("initials");
    let initials = document.getElementById("initials").value;
    if (highScores === null) {
        highScores = JSON.stringify([
            {
                initials: initials,
                score: score
            }
        ]);
    } else {
        let highScoresParsed = JSON.parse(highScores);
        highScoresParsed.push({
            initials: initials,
            score: score
        });
        highScores = JSON.stringify(highScoresParsed);
    }
    localStorage.setItem("initials", highScores);
    renderScores();
    document.getElementById("initials").value = "";
}

function renderScores() {
    document.getElementById("display-score").innerHTML = "";
    let parsedScores = JSON.parse(localStorage.getItem("initials"));
    if (parsedScores === null) {
        document.getElementById("display-score").innerHTML = "";
    } else {
        parsedScores.sort((a, b) => {
            return b.score - a.score;
        });
        parsedScores.forEach((score, index) => {
            document.getElementById("display-score").innerHTML += index + 1 + ": " + score.initials + " " + score.score + "<br />";
        });
    }
}

function clearScores() {
    localStorage.clear();
    renderScores();
}

function goBack() {
    document.getElementById("highscore").style.display = 'none';
    document.getElementById("quiz-intro").style.display = 'inline';
}

function viewScores() {
    clearInterval(timer);
    document.getElementById("quiz-intro").style.display = 'none';
    document.getElementById("quiz-questions").style.display = 'none';
    document.getElementById("quiz-end").style.display = 'none';
    document.getElementById("score").style.display = 'none';
    document.getElementById("highscore").style.display = 'inline';
    renderScores();
}
