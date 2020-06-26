
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
    q1Dr.push(data.drinks[0].strDrink)

    for (var i = 1; i < 16; i++) {
        if (data.drinks[0][`strIngredient${i}`]) {
            var measure = ""
            if(data.drinks[0][`strMeasure${i}`]) {
                measure=data.drinks[0][`strMeasure${i}`]
            } 
        // newLi.text(data.drinks[0][`strIngredient${i}`] + " " + measure);
        var ingredient = (measure + " " + data.drinks[0][`strIngredient${i}`])  

        q1In.push(ingredient);
        
        }
    }  
});
}

// nicks question code goes here
randomDrink(q1In, q1Dr)
q1In
q1Dr
// nicks question code goes here


randomDrink(q2In, q2Dr)
console.log(q2In)
console.log(q2Dr)

randomDrink(q3In, q3Dr)
console.log(q3In)
console.log(q3Dr)

randomDrink(q4In, q4Dr)
console.log(q4In)
console.log(q4Dr)

randomDrink(q5In, q5Dr)
console.log(q5In)
console.log(q5Dr)



