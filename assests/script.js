/* variables */

//timer for the quiz
var timer = document.querySelector('.timer');
var timerStart = 100;

//quiz variables

var quizContainer = document.getElementById('quizSection');
var resultsContainer = document.getElementById('resultsSection');
var submitButton = document.getElementById('submitButton');


//questions to be rotated through
var quizQuestions = [ 
    {
        question: 'What function allows you to add to a parent of the HTML?',
        answers: {
            a: 'setTime()',
            b: 'setAttribute()',
            c: 'getElementById()',
            d: 'appendChild()'
        },
        correctAnswer: 'd'
    },
    {
        question: 'What is the notation most commonly used to name variables?',
        answers: {
            a: 'camelCase',
            b: 'lowercase',
            c: 'UpperCase',
            d: 'BOLD'
        },
        correctAnswer: 'a'
    }
];

/* functions */

//function to set the timer
function setTime() {
    var timerInterval = setInterval(function() {
        timerStart--;
        timer.textContent = timerStart + " seconds left!";

        if(timerStart === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

//generate quiz

generateQuiz(quizQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    var output = [];
    var answers;

    for(var i=0; i<questions.length; i++){
     
      answers = [];

      for(letter in questions[i].answers){
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + letter + ': '
            + questions[i].answers[letter]
          + '</label>'
        );
      }
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }
    quizContainer.innerHTML = output.join('');
  }

  function showResults(questions, quizContainer, resultsContainer){
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    var userAnswer = '';
    var numCorrect = 0;
    
    
    for(var i=0; i<questions.length; i++){
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

      if(userAnswer === questions[i].correctAnswer) {
        numCorrect++;
        answerContainers[i].style.color = 'lightgreen';
      } else{
        answerContainers[i].style.color = 'red';
      }
    }

    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  showQuestions(questions, quizContainer);
  
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }

}

generateQuiz(quizQuestions, quizContainer, resultsContainer, submitButton);
setTime();