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
  if(timeDone === 0) {
    timeDone = setInterval(function() {
      timeTotal--;
      timer.textContent = "Time Remaining -- " + timeTotal + " seconds left";

      if(timeTotal === 1) {
        timer.textContent = "Time Remaining -- " + timeTotal + " second left!";
      } else if (timeTotal <= 0) {
        clearInterval(timeDone);
        timer.textContent = "Hope you're happy with your answers!";
      }
    }, 1000);
  }
  render(questionIndex);
})


