var divArray = [];
var drinkArray = [];
var meetMixMe = $(".meetMixMe")

//function that generates random drink on pageload 
pageLoad();

//keyup function allows a user to fire search function by pressing enter and prevents enter from resetting page 
$("#tempSearchBar").keyup(function () {
    if (event.which == 13) {
        divArray = [];
        drinkArray = [];
        $("#container").empty();
        $("#container2").empty();
        $(".meetMixMe").empty();
        var ingredient = $("#tempSearchBar").val().trim();
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
            ingredient;
//ajax call to get drink info 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // this IF statement alerts a user if the value of their input is not adequate for the ajax
            if (response == "") {
                $("#tempSearchBar").val("Not a valid ingredient, please try again")
                $("#tempSearchBar").attr("class", "error");
               }  else 
               $("#tempSearchBar").attr("class", "errorFix");
            for (var i = 0; i < response.drinks.length; i++) {
                //For loop that runs to create the divs with drink info 
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
                newDiv.attr("class", "article-row-img grid-x align-center");
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
            }
            //click function to initiate search when you click a drink to take you to the full details  
            $(".clickable").on("click", function () {
                var clickedId = $(this).attr("id");
                //function that takes the idea of first ajax and uses it to search a second ajax call by ID 
                function getInstructions(num) {
                    var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + num;
                    $.ajax({
                        url: drinkIngredients,
                        method: "GET"
                    }).then(function (data) {
                        divArray = [];
                        drinkArray = [];
                        $("#container").empty();
                        $("#container2").empty();
                        console.log(data);
                        var newerDiv = $("<div>");
                        newerDiv.attr("class", "grid-x align-center")
                        $("#container2").append(newerDiv);
                        var drinkInfoDiv = $("<div>");
                        drinkInfoDiv.attr("class", "medium-6 drink-info");
                        newerDiv.append(drinkInfoDiv);
                        var secondDiv = $("<div>");
                        secondDiv.attr("class", "drink-name");
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
                        newLi.text(data.drinks[0].strIngredient1 + data.drinks[0].strMeasure1);
                        newUl.append(newLi);
                        for (var i = 2; i < 16; i++) {
                            if (data.drinks[0][`strIngredient${i}`]) {
                                var measure = ""
                                if (data.drinks[0][`strMeasure${i}`]) {
                                    measure = data.drinks[0][`strMeasure${i}`]
                                }
                                var newLi = $("<li>");
                                newLi.text(data.drinks[0][`strIngredient${i}`] + " " + measure);
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
                getInstructions(clickedId);
            })
            function getInstructions(drinkId, num) {
                var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
                $.ajax({
                    url: drinkIngredients,
                    method: "GET"
                }).then(function (data) {
                    //console.log(data);
                    var lastUl = $("<ul>");
                    lastUl.attr("class", "ingredients");
                    for (var i = 1; i < 16; i++) {

                        if (data.drinks[0][`strIngredient${i}`]) {
                            var measure = ""
                            if (data.drinks[0][`strMeasure${i}`]) {
                                measure = data.drinks[0][`strMeasure${i}`]
                            }
                            var lastLi = $("<li>");
                            lastLi.text(measure + " " + data.drinks[0][`strIngredient${i}`]);
                            lastUl.append(lastLi);
                        }
                    }
                    (divArray[num]).append(lastUl);

                });
            }
            for (let i = 0; i < drinkArray.length; i++) {
                getInstructions(drinkArray[i], [i]);
            }
        });
    };


}).keydown(function (event) {
    if (event.which == 13) {
        event.preventDefault();
    }
});

$("#btnMixMe").on("click submit", function search() {
    divArray = [];
    drinkArray = [];
    $("#container").empty();
    $("#container2").empty();
    $(".meetMixMe").empty();
    $(meetMixMe).empty();
    var ingredient = $("#tempSearchBar").val().trim();
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
        ingredient;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
         console.log(response);
       if (response == "") {
        $("#tempSearchBar").val("Not a valid ingredient, please try again")
        $("#tempSearchBar").attr("class", "error");
    }  else 
        $("#tempSearchBar").attr("class", "errorFix");
            for (var i = 0; i < response.drinks.length; i++) {
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
            newDiv.attr("class", "article-row-img grid-x align-center");
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
            // console.log(drinkId);
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
                    $("#container2").empty();
                    // console.log(data);
                    var newerDiv = $("<div>");
                    newerDiv.attr("class", "grid-x align-center")
                    $("#container2").append(newerDiv);
                    var drinkInfoDiv = $("<div>");
                    drinkInfoDiv.attr("class", "medium-6 drink-info");
                    newerDiv.append(drinkInfoDiv);
                    var secondDiv = $("<div>");
                    secondDiv.attr("class", "drink-name");
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
                            newLi.text(data.drinks[0][`strIngredient${i}`] + " " + measure);
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
            getInstructions(clickedId);
        })
        function getInstructions(drinkId, num) {
            var drinkIngredients = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
            $.ajax({
                url: drinkIngredients,
                method: "GET"
            }).then(function (data) {
                //console.log(data);
                var lastUl = $("<ul>");
                lastUl.attr("class", "ingredients");
                for (var i = 1; i < 16; i++) {

                    if (data.drinks[0][`strIngredient${i}`]) {
                        var measure = ""
                        if (data.drinks[0][`strMeasure${i}`]) {
                            measure = data.drinks[0][`strMeasure${i}`]
                        }
                        var lastLi = $("<li>");
                        lastLi.text(measure + " " + data.drinks[0][`strIngredient${i}`]);
                        lastUl.append(lastLi);
                    }
                }
                (divArray[num]).append(lastUl);

            });
        }
        for (let i = 0; i < drinkArray.length; i++) {
            getInstructions(drinkArray[i], [i]);
        }
    });
});

//function to load the random drink 
function pageLoad() {
    var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    $.ajax({
        url: randomDrink,
        method: "GET"
    }).then(function (data) {
        // console.log(data);
        var newerDiv = $("<div>");
        newerDiv.attr("class", "grid-x align-center")
        $("#container2").append(newerDiv);
        var drinkInfoDiv = $("<div>");
        drinkInfoDiv.attr("class", "medium-6 drink-info");
        newerDiv.append(drinkInfoDiv);
        var secondDiv = $("<div>");
        secondDiv.attr("class", "grid-y drink-name enjoy-random");
        drinkInfoDiv.append(secondDiv);
        var randomH3 = $("<h3>")
        randomH3.text("Enjoy A Random Mix!")
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

