var startLibEl = $(".startLib")
var singleDrink = $("#container")
var letterAG = "abcdefg"
var letterHM = "hijklm"
var letterNS = "nopqrs"
var letterTZ = "tuvwxyz"
var drinkId = [];

pageLoad();


$("#AG").on("click", function () {
    for (let i = 0; i < letterAG.length; i++) {
        getDrinks(letterAG[i])
    }
})

$("#HM").on("click", function () {
    for (let i = 0; i < letterHM.length; i++) {
        getDrinks(letterHM[i])
    }
})

$("#NS").on("click", function () {
    for (let i = 0; i < letterNS.length; i++) {
        getDrinks(letterNS[i])
    }
})

$("#TZ").on("click", function () {
    for (let i = 0; i < letterTZ.length; i++) {
        getDrinks(letterTZ[i])
    }
})

function getDrinks(letters) {
    $(startLibEl).empty();
    $(singleDrink).empty();

    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letters

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        for (let i = 0; i < data.drinks.length; i++) {
            var drink = data.drinks[i];
            var newDiv = $("<div>");
            newDiv.attr("class", "product-card");
            startLibEl.append(newDiv);
            var imgDiv = $("<div>");
            imgDiv.attr("class", "product-card-thumbnail");
            newDiv.append(imgDiv);
            var imgA = $("<a>");
            imgA.attr("class", "clickable")
            imgA.attr("id", drink.idDrink);
            imgDiv.append(imgA);
            var img = $("<img>");
            img.attr("src", drink.strDrinkThumb);
            img.attr("alt", drink.strDrink);
            imgA.append(img);
            var drinkName = $("<h2>");
            drinkName.attr("class", "product-drink-name")
            var nameA = $("<a>");
            nameA.attr("class", "clickable")
            nameA.attr("id", drink.idDrink);
            nameA.text(drink.strDrink);
            drinkName.append(nameA);
            newDiv.append(drinkName);
            var span = $("<span>");
            span.attr("class", "product-ingri");
            span.text("Ingredients");
            newDiv.append(span);
            var ul = $("<ul>");
            ul.attr("class", "product-ul");
            newDiv.append(ul);
            for (var j = 1; j < 16; j++) {
                if (drink[`strIngredient${j}`]) {
                    var li = $("<li>");
                    li.text(drink[`strIngredient${j}`]);
                    ul.append(li);
                }
            }
        }
        localStorage.setItem("key", "")
        $(".clickable").on("click", function (something) {
            var clickedId = $(this).attr("id");
            if(localStorage.getItem("key") === ""){
                getInstructions(clickedId);
            }
            localStorage.setItem("key", "stopMixMe")
        })
    })
}

function getInstructions(num) {
    $(startLibEl).empty();
    $(singleDrink).empty();

    var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + num;

    $.ajax({
        url: drinkIngredients,
        method: "GET"
    }).then(function (data) {
        // console.log(data);
        var newerDiv = $("<div>");
        newerDiv.attr("class", "grid-x align-center")
        $(singleDrink).append(newerDiv);
        var drinkInfoDiv = $("<div>");
        drinkInfoDiv.attr("class", "drink-info");
        newerDiv.append(drinkInfoDiv);
        var secondDiv = $("<div>");
        secondDiv.attr("class", "grid-y drink-name");
        drinkInfoDiv.append(secondDiv);
        var newerImg = $("<img>");
        newerImg.attr("src", data.drinks[0].strDrinkThumb);
        newerImg.attr("class", "featured-drink")
        secondDiv.append(newerImg);
        var newerH3 = $("<h3>");
        newerH3.attr("class", "drinkName");
        newerH3.text(data.drinks[0].strDrink);
        drinkInfoDiv.append(newerH3);
        var newH5 = $("<h5>");
        newH5.text("Ingredients:");
        drinkInfoDiv.append(newH5);
        var newUl = $("<ul>");
        newUl.attr("class", "ingredients");
        drinkInfoDiv.append(newUl);
        var newLi = $("<li>");
        newLi.text(data.drinks[0].strMeasure1 + " " + data.drinks[0].strIngredient1);
        newUl.append(newLi);
        for (var i = 2; i < 16; i++) {
            if (data.drinks[0][`strIngredient${i}`]) {
                var measure = ""
                if (data.drinks[0][`strMeasure${i}`]) {
                    measure = data.drinks[0][`strMeasure${i}`]
                }
                var newLi = $("<li>");
                newLi.text(measure + " " + data.drinks[0][`strIngredient${i}`]);
                newUl.append(newLi);
            }
        }
        var newerH5 = $("<h5>");
        newerH5.text("Glass typically used:");
        drinkInfoDiv.append(newerH5);
        var glassType = $("<ul>");
        glassType.attr("class", "ingredients");
        drinkInfoDiv.append(glassType);
        var glassLi = $("<li>");
        glassLi.text(data.drinks[0].strGlass);
        glassType.append(glassLi);
        var instructionsH5 = $("<h5>");
        instructionsH5.text("Instructions:")
        drinkInfoDiv.append(instructionsH5);
        var detailedInstructions = $("<p>");
        detailedInstructions.attr("class", "instructions");
        detailedInstructions.text(data.drinks[0].strInstructions);
        drinkInfoDiv.append(detailedInstructions);
    });
}

function pageLoad() {
    var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    $.ajax({
        url: randomDrink,
        method: "GET"
    }).then(function (data) {
        // console.log(data);
        var newerDiv = $("<div>");
        newerDiv.attr("class", "grid-x align-center")
        $("#container").append(newerDiv);
        var drinkInfoDiv = $("<div>");
        drinkInfoDiv.attr("class", "medium-6 drink-info");
        newerDiv.append(drinkInfoDiv);
        var secondDiv = $("<div>");
        secondDiv.attr("class", "grid-y drink-name one-of-many");
        drinkInfoDiv.append(secondDiv);
        var randomH3 = $("<h3>")
        randomH3.text("One Of Many Mixes!")
        secondDiv.prepend(randomH3)
        var newerImg = $("<img>");
        newerImg.attr("src", data.drinks[0].strDrinkThumb);
        newerImg.attr("class", "featured-drink")
        secondDiv.append(newerImg);
        var newerH3 = $("<h3>");
        newerH3.attr("class", "drinkName");
        newerH3.text(data.drinks[0].strDrink);
        drinkInfoDiv.append(newerH3);
        var newH5 = $("<h5>");
        newH5.text("Ingredients:");
        drinkInfoDiv.append(newH5);
        var newUl = $("<ul>");
        newUl.attr("class", "ingredients");
        drinkInfoDiv.append(newUl);
        var newLi = $("<li>");
        newLi.text(data.drinks[0].strMeasure1 + " " + data.drinks[0].strIngredient1);
        newUl.append(newLi);
        for (var i = 2; i < 16; i++) {
            if (data.drinks[0][`strIngredient${i}`]) {
                var measure = ""
                if(data.drinks[0][`strMeasure${i}`]) {
                    measure=data.drinks[0][`strMeasure${i}`]
                } 
            var newLi = $("<li>");
            newLi.text(measure + " " + data.drinks[0][`strIngredient${i}`]);
            newUl.append(newLi);
            }
        }                  
        var newerH5 = $("<h5>");
        newerH5.text("Glass typically used:");
        drinkInfoDiv.append(newerH5);
        var glassType = $("<ul>");
        glassType.attr("class", "ingredients");
        drinkInfoDiv.append(glassType);
        var glassLi = $("<li>");
        glassLi.text(data.drinks[0].strGlass);
        glassType.append(glassLi);
        var instructionsH5 = $("<h5>");
        instructionsH5.text("Instructions:")
        drinkInfoDiv.append(instructionsH5);
        var detailedInstructions = $("<p>");
        detailedInstructions.attr("class", "instructions");
        detailedInstructions.text(data.drinks[0].strInstructions);
        drinkInfoDiv.append(detailedInstructions);
    });
}
