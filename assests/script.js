/* variables */

//timer for the quiz
var timer = document.querySelector('.timer');
var timerStart = 5;

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
       
        timer.textContent = timerStart + ' seconds left!';

        if(timerStart === 0) {
          clearInterval(timerInterval);
        }
    }, 1000);
}

//generate quiz
function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    //output array that is empty so that the questions can be pushed into it
    var output = [];
    var answers;

    for(var i=0; i<questions.length; i++){
      //answers array that is empty so that possible answers can be pushed into it
      answers = [];

      for(letter in questions[i].answers){
        //puts in the answers to quizQuestions in a multiple choice style select
        answers.push(
            '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + letter 
            + ': '
            + questions[i].answers[letter]
            + '</label>'
        );
      }
      //puts the questions in quizQuestions and the answers into the output
      output.push(
        '<div class="question">' 
        + questions[i].question 
        + '</div>'
        + '<div class="answers">' 
        + answers.join('') 
        + '</div>'
      );
    }
    //puts output into one string of html on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(questions, quizContainer, resultsContainer){
    //takes the answers from the quizContainer
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    //keeps track of the users inputs
    var userAnswer = '';
    var numCorrect = 0;
    
    //finds the selected answer and determines if it is correct or not
    for(var i=0; i<questions.length; i++){
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

      if(userAnswer === questions[i].correctAnswer) {
        numCorrect++;
        answerContainers[i].style.color = 'lightgreen';
      } else{
        answerContainers[i].style.color = 'red';
      }
    }

    //shows number of correct answers out of the total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  //runs the showQuestions function
  showQuestions(questions, quizContainer);
  
  //when submit button is clicked, results are shown
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }

}

//function to show submit button
function addSubmit() {
  document.getElementById('submitButton').style.display = 'block';
}

//function to start timer and quiz
function startTimer() {
  setTime();
  generateQuiz(quizQuestions, quizContainer, resultsContainer, submitButton);
  addSubmit();
}
