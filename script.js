const startButton = $('#start-btn')
let difficulty = $('#difficulty')
const label = $('#theLabel')
const nextButton = $('#next-btn')
const questionContainerElement = $('#question-container')
const questionElement = $('#question')
const answerButtonsElement = $('#answer-buttons')
var timer = 0;
var score = 1;
let shuffledQuestions, currentQuestionIndex

startButton.on('click', startGame)
nextButton.on('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function setGame() {
  userDifficulty = $("#difficulty").val();
  if (userDifficulty !== null) {
    difficulty = userDifficulty;
  }

  switch (difficulty) {
    case "moderate":
        timer = 31;    
        break;
    case "hard":
        timer = 16;    
        break;
    default:
        timer = 46;    
        break;
}}

function endGame() {
  if (timer === 0){
  }
}

var q1In =[]
var q1Dr = []
var q2In =[]
var q2Dr = []
var q3In =[]
var q3Dr = []
var q4In =[]
var q4Dr = []
var q5In =[]
var q5Dr = []
var q6In =[]
var q6Dr = []
var q7In =[]
var q7Dr = []
var q8In =[]
var q8Dr = []
var q9In =[]
var q9Dr = []
// var q10In =[]
var q10Dr = []

function randomDrink(q1In, q1Dr) {
    var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    ingredients = [];
    drinkName = [];

$.ajax({
    url: randomDrink,
    method: "GET"
}).then(function (data) {
    // console.log(data);
    // newLi.text(data.drinks[0].strIngredient1 + data.drinks[0].strMeasure1);
    // newUl.append(newLi);
    // var q1Drink = data.drinks[0].strDrink
    q1Dr.push(data.drinks[0].strDrink)
    console.log(data.drinks[0].strDrink)
    for (var i = 1; i < 16; i++) {
        if (data.drinks[0][`strIngredient${i}`]) {
            var measure = ""
            if(data.drinks[0][`strMeasure${i}`]) {
                measure=data.drinks[0][`strMeasure${i}`]
            } 
        // newLi.text(data.drinks[0][`strIngredient${i}`] + " " + measure);
        var ingredient = (measure + " " + data.drinks[0][`strIngredient${i}`])  
        console.log(ingredient)
        q1In.push(ingredient);
        
        }
    }  
});
}
randomDrink(q1In, q1Dr)
console.log(q1Dr[0])

function startGame() {
  startButton.addClass('hide')
  difficulty.addClass('hide')
  label.addClass('hide')
  setGame();
  var timerInterval = setInterval(function () {
    timer--;
    $("#timer").text(timer);
    if (timer === 0){
      $("#time").addClass('hide')
      $("#scoreHolder").addClass('hide')
      resetGame()
    }
      
}, 1000);
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.removeClass('hide')
  setNextQuestion()
}

function resetGame(){
  $(".container").text("Game Over")
  setTimeout(function() {
    location.reload();
  }, 5000);
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(questionObj) {
  questionElement.text(questionObj.question)
  answerButtonsElement.empty()
  questionObj.answers.forEach(answer => {
    const button = $("<button>") 
    button.text(answer.text)
    button.addClass('btn') 
    if (answer.correct) {
      button.attr("data-correct", answer.correct) 
    }
    button.on('click', selectAnswer)
    answerButtonsElement.append(button)
  })
}

function resetState() {
  clearStatusClass("body")
  nextButton.addClass('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass("body", correct)
  answerButtonsElement.each(i => {
    setStatusClass($(this), $(this).attr("data-correct"))
    

  })
  if(correct){
    $("#score").text(score++)
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.removeClass('hide')
  } else {
    $("#time").addClass('hide')
    $("#scoreHolder").addClass('hide')
    resetGame()
  }
  
}


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    $("*").addClass("correct")
  } else {
    $("*").addClass("wrong")
  }
}

function clearStatusClass(element) {
  $("*").removeClass("correct")
  $("*").removeClass("wrong")
}


// var q1In =[]
// var q1Dr = []
// var q2In =[]
// var q2Dr = []
// var q3In =[]
// var q3Dr = []
// var q4In =[]
// var q4Dr = []
// var q5In =[]
// var q5Dr = []
// var q6In =[]
// var q6Dr = []
// var q7In =[]
// var q7Dr = []
// var q8In =[]
// var q8Dr = []
// var q9In =[]
// var q9Dr = []
// // var q10In =[]
// var q10Dr = []

// function randomDrink(q1In, q1Dr) {
//     var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

//     ingredients = [];
//     drinkName = [];

// $.ajax({
//     url: randomDrink,
//     method: "GET"
// }).then(function (data) {
//     // console.log(data);
//     // newLi.text(data.drinks[0].strIngredient1 + data.drinks[0].strMeasure1);
//     // newUl.append(newLi);
//     var q1Drink = data.drinks[0].strDrink
//     q1Dr.push(q1Drink)
//     console.log(data.drinks[0].strDrink)
//     for (var i = 1; i < 16; i++) {
//         if (data.drinks[0][`strIngredient${i}`]) {
//             var measure = ""
//             if(data.drinks[0][`strMeasure${i}`]) {
//                 measure=data.drinks[0][`strMeasure${i}`]
//             } 
//         // newLi.text(data.drinks[0][`strIngredient${i}`] + " " + measure);
//         var ingredient = (measure + " " + data.drinks[0][`strIngredient${i}`])  
//         console.log(ingredient)
//         q1In.push(ingredient);
        
//         }
//     }  
// });
// }
var drinkList = ["Aperol Spritz", "Bloody Mary", "Caipirinha", "Champagne Cocktail", "Espresso Martini", "Irish Coffee", "Manhattan", "Margarita", "Martini", "Moscow Mule", "Negroni", "Pimm's Cup", "Pina Colada", "Pousse Cafe", "Aviation", "Boulevardier", "Bronx Cocktail", "Clover Club", "French 75", "Gimlet", "Greyhound", "Lemon Drop Martini", "Mimosa", "Mint Julep", "Equinox Spice", "Frisk Cocktail", "Godfather", "Hauntini", "Holiday Spice", "Ignus Fatuus", "Jazz", "Kurant Affair", "Little Princess", "Limbo", "Los Muertos", "Lucky Lady", "Macua", "Merry Mary", "Mind Eraser", "Opera"] 

var questionArray = []

//For loop gathers the false options

for(i = 0; i <30; i++){
  var drink = drinkList[Math.floor(Math.random() * drinkList.length)];
  questionArray.push(drink)
}

let questions = [
  {
    question: 'These ingredients: ' + "2 oz Blended whiskey, Juice of 1/2 Lemon, 1/2 tsp Powdered sugar, 1 Cherry, 1/2 slice Lemon " + 'make which drink?',
    answers: [
      { text: questionArray[0], correct: false },
      { text: questionArray[1], correct: false },
      { text: "Whiskey Sour", correct: true },
      { text: questionArray[2], correct: false }

    ]
  },

  {
    question: 'These ingredients: ' + "1 1/2 oz Light rum, Juice of 1/2 Lime, 1 tsp Powdered sugar " + 'make which drink?',
    answers: [
      { text: "Daiquiri", correct: true },
      { text: questionArray[3], correct: false },
      { text: questionArray[4], correct: false },
      { text: questionArray[5], correct: false }

    ]
  },
  {
    question: 'These ingredients: ' + "1 1/4 oz Absolut Citron, 1/4 oz Lime juice, 1/4 oz Cointreau, 1/4 cup Cranberry juice " + 'make which drink?',
    answers: [
      { text: questionArray[6], correct: false },
      { text: "Cosmopolitan", correct: true },
      { text: questionArray[7], correct: false },
      { text: questionArray[8], correct: false }

    ]
  },
  {
    question: 'These ingredients: ' + "1/2 oz Vodka, 1/2 oz Light rum, 1/2 oz Gin, 1/2 oz Tequila, Juice of 1/2 Lemon, 1 splash Coca-Cola " + 'make which drink?',
    answers: [
      { text: questionArray[9], correct: false },
      { text: questionArray[10], correct: false },
      { text: questionArray[11], correct: false },
      { text: "Long Island Iced Tea", correct: true },

    ]
  },
  {
    question: 'These ingredients: ' + "1 oz Light rum, 1/2 oz Orgeat syrup, 1/2 oz Triple sec, 1 1/2 oz Sweet and sour, 1 Cherry " + 'make which drink?',
    answers: [
      { text: questionArray[12], correct: false },
      { text: "Mai-Tai", correct: true },
      { text: questionArray[13], correct: false },
      { text: questionArray[14], correct: false }

    ]
  },
  {
    question: 'These ingredients: ' + "4.5 cL Bourbon, 2 dashes Angostura bitters, 1 cube Sugar, dash Water " + 'make which drink?',
    answers: [
      { text: questionArray[15], correct: false },
      { text: questionArray[16], correct: false },
      { text: "Old-Fashioned", correct: true },
      { text: questionArray[17], correct: false }

    ]
  },
  {
    question: 'These ingredients: ' + "2 oz Cognac, 1/2 oz Cointreau, 1 oz Lemon juice " + 'make which drink?',
    answers: [
      { text: questionArray[18], correct: false },
      { text: "Sidecar", correct: true },
      { text: questionArray[19], correct: false },
      { text: questionArray[20], correct: false }

    ]
  },
  {
    question: 'These ingredients: ' + "1/2 oz Midori melon liqueur, 1/2 oz Jägermeister, 1/2 oz Goldschlager" + 'make which drink?',
    answers: [
      { text: "Bob Marley", correct: true },
      { text: questionArray[21], correct: false },
      { text: questionArray[22], correct: false },
      { text: questionArray[23], correct: false }

    ]
  },
  {
    question: 'These ingredients: ' + "6 oz Champagne, 1 oz Peach schnapps " + 'make which drink?',
    answers: [
      { text: questionArray[24], correct: false },
      { text: questionArray[25], correct: false },
      { text: questionArray[26], correct: false },
      { text: "Bellini", correct: true }

    ]
  },
  {
    question: 'These ingredients: ' + "1 oz Vodka, 1 oz Triple sec, 1 oz Lime juice" + 'make which drink?',
    answers: [
      { text: questionArray[27], correct: false },
      { text: "Kamikaze", correct: true },
      { text: questionArray[28], correct: false },
      { text: questionArray[29], correct: false }

    ]
  },
]
