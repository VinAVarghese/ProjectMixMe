var divArray = [];
var drinkArray = [];

pageLoad();

$("#btnMixMe").on("click", function () {
    divArray = [];
    drinkArray = [];
    $("#container").empty();
    var ingredient = $("#tempSearchBar").val().trim();
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
        ingredient;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //  console.log(response);
        for (var i = 0; i < 10; i++) {
            var newDiv = $("<div>");
            $("#container").append(newDiv);
            var newArticle = $("<article>");
            newArticle.attr("class", "article-row grid-y");
            var clickPic = $("<a>");
            clickPic.attr("class", "clickable")
            clickPic.attr("id", response.drinks[i].idDrink)
            clickPic.append(newArticle);
            newDiv.append(clickPic)
            var newDiv = $("<div>");
            newDiv.attr("class", "article-row-img");
            newArticle.append(newDiv);
            var newImg = $("<img>");
            newImg.attr("src", response.drinks[i].strDrinkThumb);
            newImg.attr("id", "product")
            newDiv.append(newImg);
            var divTitle = $("<div>");
            divTitle.attr("class", `article-row-content ${[i]}`);
            newArticle.append(divTitle);
            var newH3 = $("<h3>");
            newH3.attr("class", "article-row-content-header");
            newH3.text(response.drinks[i].strDrink);
            divTitle.append(newH3);

            divArray.push(divTitle);

            var drinkId = response.drinks[i].idDrink;
            drinkArray.push(drinkId)
            // console.log(drinkId);
        }
        $(".clickable").on("click", function () {
            var clickedId = $(this).attr("id");
            console.log(clickedId);

            function getInstructions(num) {
                var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + num;
                $.ajax({
                    url: drinkIngredients,
                    method: "GET"
                }).then(function (data) {
                    divArray = [];
                    drinkArray = [];
                    $("#container").empty();
                    console.log(data);
                    var newerArticle = $("<article>");
                    newerArticle.attr("class", `article-row grid-y`);
                    $("#container").append(newerArticle);
                    var newerDiv = $("<div>");
                    newerDiv.attr("class", "article-row-img")
                    newerArticle.append(newerDiv);
                    var newerImg = $("<img>");
                    newerImg.attr("src", data.drinks[0].strDrinkThumb);
                    newerImg.attr("id", "product")
                    newerDiv.append(newerImg);
                    var newTitle = $("<div>");
                    newTitle.attr("class", "article-row-content");
                    newerArticle.append(newTitle);
                    var newerH3 = $("<h3>");
                    newerH3.attr("class", "article-row-content-header");
                    newerH3.text(data.drinks[0].strDrink);

                });
            }
            getInstructions(clickedId);
        })
        function getInstructions(drinkId, num) {
            var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
            $.ajax({
                url: drinkIngredients,
                method: "GET"
            }).then(function (data) {
                //console.log(data);
                var newP = $("<p>");
                newP.attr("class", `article-row-content-description`);
                newP.text(data.drinks[0].strInstructions);
                (divArray[num]).append(newP);
            });
        }
        for (let i = 0; i < 10; i++) {
            getInstructions(drinkArray[i], [i]);
        }
    });
});

function pageLoad() {
    var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    $.ajax({
        url: randomDrink,
        method: "GET"
    }).then(function (random) {
        console.log(random);
    });
}

