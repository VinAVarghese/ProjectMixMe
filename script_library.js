var startLibEl = $(".startLib")
var singleDrink = $("#container")
var letterAG = "abcdefg"
var letterHM = "hijklm"
var letterNS = "nopqrs"
var letterTZ = "tuvwxyz"


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
            span.text("Ingridents");
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
    })
}

// $(".clickable").on("click", function () {
//     var clickedId = $(this).attr("id");
//     getInstructions(clickedId);
//     console.log("hi");
// })

// function getInstructions(num) {
//     $(startLibEl).empty();
//     $(singleDrink).empty();
//     var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + num;
//     $.ajax({
//         url: drinkIngredients,
//         method: "GET"
//     }).then(function (data) {
//         var newerArticle = $("<article>");
//         newerArticle.attr("class", `article-row grid-y`);
//         $(singleDrink).append(newerArticle);
//         var newerDiv = $("<div>");
//         newerDiv.attr("class", "article-row-img grid-x align-center")
//         newerArticle.append(newerDiv);
//         var newerImg = $("<img>");
//         newerImg.attr("src", data.drinks[0].strDrinkThumb);
//         newerImg.attr("id", "product")
//         newerDiv.append(newerImg);
//         var newTitle = $("<div>");
//         newTitle.attr("class", "article-row-content");
//         newerArticle.append(newTitle);
//         var newerH3 = $("<h3>");
//         newerH3.attr("class", "article-row-content-header");
//         newerH3.text(data.drinks[0].strDrink);
//     });
// }