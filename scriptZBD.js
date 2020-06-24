

$("#Btn").on("click", function() {
    var ingredient = "gin";
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
      ingredient;
    var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        // console.log(response);
        var drinkId = response.drinks[0].idDrink;
        var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
        $.ajax({
            url: drinkIngredients,
            method: "GET"
          }).then(function(data) {
              console.log(data)

          });
      
    });


});

