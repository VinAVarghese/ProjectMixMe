var divArray = [];
var drinkArray = [];

$("#Btn").on("click", function() {
    var ingredient = $("#tempSearchBar").val().trim();
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
      ingredient;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        // console.log(response);
        for (var i = 0; i < 10; i++) {
        var newArticle = $("<article>");
        newArticle.attr("class", "article-row");
        $("#container").append(newArticle)
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
           function getInstructions(drinkId,num) {
           var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
            $.ajax({
                url: drinkIngredients,
                method: "GET"
            }).then(function(data) {
                console.log(data);
                var newP = $("<p>");
                newP.attr("class", `article-row-content-description`);
                newP.text(data.drinks[0].strInstructions);
                (divArray[num]).append(newP);
            });
        }
        for (let i = 0; i < 10; i++) {
            getInstructions(drinkArray[i],[i]);            
        }      
    });
});

