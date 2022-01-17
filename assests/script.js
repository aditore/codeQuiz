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
    },
    {
      question: 'Commonly used data types DO NOT include:',
      answers: [
          'strings',
          'booleans',
          'alerts',
          'numbers'
      ],
      correctAnswer: 'alerts'
    },
    {
      question: 'The condition in an if / else statement is enclosed within ____.',
      answers: [
          'quotes',
          'curly brackets',
          'parentheses',
          'square brackets'
      ],
      correctAnswer: 'parentheses'
    },
    {
      question: 'Arrays in JavaScript can be used to store ____.',
      answers: [
          'numbers and strings',
          'other arrays',
          'booleans',
          'all of the above'
      ],
      correctAnswer: 'all of the above'
    },
    {
      question: 'String values must be enclosed within ____ when being assigned to variables.',
      answers: [
          'commas',
          'curly brackets',
          'quotes',
          'parentheses'
      ],
      correctAnswer: 'quotes'
    },
    {
      question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
      answers: [
          'JavaScript',
          'terminal / bash',
          'for loops',
          'console.log'
      ],
      correctAnswer: 'console.log'
    }
];

/* functions */

//timer function for start button
function startQuiz() {
  if (timeDone === 0) {
    timeDone = setInterval(function() {
      timeTotal--;
      timer.textContent = "Time Remaining -- " + timeTotal + " seconds left";

      if (timeTotal === 1) {
        timer.textContent = "Time Remaining -- " + timeTotal + " second left!";
      } else if (timeTotal <= 0) {
        clearInterval(timeDone);
        timer.textContent = "Hope you're happy with your answers!";
        //if timer hits zero go to initials page
        quizComplete();
        //show message create div within scope
        var makeDiv = document.createElement("div"); 
        makeDiv.setAttribute("id", "makeDiv");
        makeDiv.textContent = "You are all done! Please submit your initials into the system above." + "The questions you got correct: " + score + "/" + quizQuestions.length + " :)";

        //append
        quiz.appendChild(makeDiv);
      }
    }, 1000);
  }
  showQuestion(questionIndex);
}
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

  //creates an li for each possible answer within the quizQuestions object
  userAnswers.forEach(function (newAnswer) {
    var newLi = document.createElement("li");
    newLi.textContent = newAnswer;
    //appends each new li item created
    quiz.appendChild(newUl);
    newUl.appendChild(newLi);
    newLi.addEventListener("click", (checkAnswer));
  })
}

//function to check if answer is correct
function checkAnswer(event) {
  var check = event.target;

  //checks if the created li is the correct answer on click
  if (check.matches("li")) {
    var makeDiv2 = document.createElement("div");
    makeDiv2.setAttribute("id", "makeDiv");

    //adds to score if answer is correct
    if (check.textContent == quizQuestions[questionIndex].correctAnswer) {
      score++;
      makeDiv2.textContent = "Nice job! You are correct!";
    } else {
      //user will lose time if the answer is wrong
      timeTotal = timeTotal - timeLoss;
      makeDiv2.textContent = "Oof, that answer is going to hurt you!";
    }
  }
  //makes sure questions move to the next in order
  questionIndex++;

  //shows score when quiz is complete in format x/quizQuestions(total length)
  if (questionIndex >= quizQuestions.length) {
    quizComplete();
    makeDiv2.textContent = "You are all done! Please submit your initials into the system above." + "The questions you got correct: " + score + "/" + quizQuestions.length + " :)";
  } else {
    showQuestion(questionIndex);
  }

  //appends the div created to show message
  quiz.appendChild(makeDiv2);
}

//function to show and append last page when quiz is complete
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

    quiz.appendChild(makeP2);
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
  makeButton.setAttribute("type", "button");
  makeButton.setAttribute("id", "submitButton");
  makeButton.textContent = "SUBMIT";

  //try again
  var makeButton2 = document.createElement("button");
  makeButton2.setAttribute("id", "tryAgain");
  makeButton2.textContent = "TRY AGAIN";

  //append
  quiz.appendChild(makeH1);
  quiz.appendChild(makeP);
  quiz.appendChild(makeLabel);
  quiz.appendChild(makeInput);
  quiz.appendChild(makeButton);
  quiz.appendChild(makeButton2);

  //submit button event listener to store highscores
  makeButton.addEventListener("click", function() {
    var init = makeInput.value;

    //prevents a null operation and creates new object that holds the current initials and score
    //will prompt alert window if no initials provided
    if (init === '') {
      window.alert("Please provide initials!");
      return false;
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

    //brings scores to highScores html
    window.location.replace("./highScores.html");
  });

  //try again button starts quiz over
  makeButton2.addEventListener("click", function() {
    window.location.replace("./index.html");
  })
}

//start quiz!
startTimer.addEventListener("click", function () {
  startQuiz();
})