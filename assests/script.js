/* variables */
var score = 0;
var questionIndex = 0;

//timer variables
var timer = document.querySelector("#timer");
var startTimer = document.querySelector("#start");
var timeTotal = 101;
var timeDone = 0;
var timeLoss = 15;

//document modifiers
var quiz = document.querySelector("#quiz");
var layout = document.querySelector("#bodyStyle");
var newUl = document.createElement("ul");

//questions to be rotated through
var quizQuestions = [ 
    {
        question: 'What function allows you to add to a parent of the HTML?',
        answers: [
            'setTime()',
            'setAttribute()',
            'getElementById()',
            'appendChild()'
        ],
        correctAnswer: 'appendChild()'
    },
    {
        question: 'What is the notation most commonly used to name variables?',
        answers: [
            'camelCase',
            'lowercase',
            'UpperCase',
            'BOLD'
        ],
        correctAnswer: 'camelCase'
    }
];

/* functions */

//timer function for start button
startTimer.addEventListener("click",function() {
  if (timeDone === 0) {
    timeDone = setInterval(function() {
      timeTotal--;
      timer.textContent = "Time Remaining -- " + timeTotal + " seconds left";

      if (timeTotal === 1) {
        timer.textContent = "Time Remaining -- " + timeTotal + " second left!";
      } else if (timeTotal <= 0) {
        clearInterval(timeDone);
        timer.textContent = "Hope you're happy with your answers!";
      }
    }, 1000);
  }
  showQuestion(questionIndex);
})

//function to render all questions to page with a for loop
function showQuestion(questionIndex) {
  //clear existing data
  quiz.innerHTML = "";
  newUl.innerHTML = "";

  for (var i = 0; i < quizQuestions.length; i++) {
    //adds variables to include the questions and answers
    var userQuestion = quizQuestions[questionIndex].question;
    var userAnswers = quizQuestions[questionIndex].answers;
    //user sees a question brought out by the for loop
    quiz.textContent = userQuestion;
  }

  //grabs to create choices for each question that comes up
  userAnswers.forEach(function (newAnswer) {
    var newLi = document.createElement("li");
    newLi.textContent = newAnswer;
    quiz.appendChild(newUl);
    newUl.appendChild(newLi);
    newLi.addEventListener("click", (checkAnswer));
  })
}

//function to check if answer is correct
function checkAnswer(event) {
  var check = event.target;

  if (check.matches("li")) {
    var makeDiv = document.createElement("div");
    makeDiv.setAttribute("id", "makeDiv");

    if (check.textContent == quizQuestions[questionIndex].correctAnswer) {
      score++;
      makeDiv.textContent = "Nice job! You are correct!";
    } else {
      //user will lose time if the answer is wrong
      timeTotal = timeTotal - timeLoss;
      makeDiv.textContent = "Oof, that answer is going to hurt you!";
    }
  }
  //makes sure questions move to the next in order
  questionIndex++;

  //shows score when quiz is complete
  if (questionIndex >= quizQuestions.length) {
    quizComplete();
    makeDiv.textContent = "You are all done! " + "The questions you got correct: " + score + "/" + quizQuestions.length + " :)";
  } else {
    showQuestion(questionIndex);
  }

  quiz.appendChild(makeDiv);
}

//function to show last page when quiz is complete
function quizComplete() {
  quiz.innerHTML = "";
  timer.innerHTML = "";

  //header
  var makeH1 = document.createElement("h1");
  makeH1.setAttribute("id", "makeH1");
  makeH1.textContent = "Phew, you finished!";

  //paragraph for time score
  var makeP = document.createElement("p");
  makeP.setAttribute("id", "makeP");

  if (timeTotal >= 0) {
    var timeScore = timeTotal + score;
    var makeP2 = document.createElement("p");
    clearInterval(timeDone);
    makeP.textContent = "Your time left combined with your score: " + timeScore;
  }

  //label
  var makeLabel = document.createElement("label");
  makeLabel.setAttribute("id", "makeLabel");
  makeLabel.textContent = "Enter your initials: ";

  //input into label
  var makeInput = document.createElement("input");
  makeInput.setAttribute("type", "text");
  makeInput.setAttribute("id", "initials");
  makeInput.textContent = "";

  //submit button
  var makeButton = document.createElement("button");
  makeButton.setAttribute("type", "submit");
  makeButton.setAttribute("id", "submitButton");
  makeButton.textContent = "SUBMIT";

  //append
  quiz.appendChild(makeH1);
  quiz.appendChild(makeP);
  quiz.appendChild(makeP2);
  quiz.appendChild(makeLabel);
  quiz.appendChild(makeInput);
  quiz.appendChild(makeButton);

  //submit button event listener to store highscores
  makeButton.addEventListener("click", function() {
    var init = makeInput.value;

    //prevents a null operation and creates new object that holds the current initials and score
    if (init === null) {
      console.log("No initials provided.");
    } else {
     var totalScore = {
        initials: init,
        timeScore: timeTotal + score
      }
    }
    console.log(totalScore);

    var allScore = localStorage.getItem("allScore");
    //prevents a null operation and creates a variable that carries the current initials and score and stores them within the browser
    if (allScore === null) {
      allScore = [];
    } else {
      allScore = JSON.parse(allScore);
    }

    allScore.push(totalScore);

    var newScore = JSON.stringify(allScore);
    localStorage.setItem("allScore", newScore);


  });
}