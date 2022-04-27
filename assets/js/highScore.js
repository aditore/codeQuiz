//new js to go with the highscores html
/* variables */
var highScore = document.getElementById('highScore');
var previousPage = document.getElementById('return');
var clear = document.getElementById('clear');

/* functionality and functions */
//goes back to the main index.html file
previousPage.addEventListener("click", function () {
    window.location.replace("../../index.html");
})

//clears the local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})

//creat li for each high score
var allScore = localStorage.getItem("allScore");
allScore = JSON.parse(allScore);
//sort the scores highest at top and lowest at bottom
allScore.sort((a, b) => {
    return b.timeScore - a.timeScore;
});
//create list item for each element in the allScore array
if (allScore !== null) {
    for (var i = 0; i < allScore.length; i++) {
        var makeLi = document.createElement("li");
        
        makeLi.textContent = allScore[i].initials + "--" + allScore[i].timeScore;
        highScore.appendChild(makeLi);
    }
}
//check in console to make sure array is organized correctly
console.log(allScore)


