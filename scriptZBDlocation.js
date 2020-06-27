

$("#btnMixMe").on("click", function () {
    $("#container").empty();
    var apiKey = "280fa1637c0958e223d90cbe4eba1bf8";
    var city = $("#tempSearchBar").val().trim();
    var cityUrl = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&apikey=" + apiKey;

    $.ajax({
        url: cityUrl,
        method: "GET",
    }).then(function(response) {
        var cityId = response.location_suggestions[0].id;
        var apiKey = "280fa1637c0958e223d90cbe4eba1bf8";
        var finalUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityId + "&entity_type=city&collection_id=432&sort=rating&apikey=" + apiKey;

        $.ajax({
            url: finalUrl,
            method: "GET",
        }).then(function(data) {
        console.log(data);
        for (var i = 0; i < 10; i++) {
            var newDiv = $("<div>");
            newDiv.attr("class", "grid-x align-center")
            $("#container").append(newDiv);
            var div2 = $("<div>");
            div2.attr("class", "grid-y column drink-name");
            newDiv.append(div2);
            var clickPic = $("<a>");
            clickPic.attr("class", "clickable")
            clickPic.attr("src", data.restaurants[i].restaurant.url)
            // clickPic.append(newDiv);
            newDiv.append(clickPic)
            var newH3 = $("<h3>");
            newH3.attr("class", "article-row-content-header");
            newH3.text(data.restaurants[i].restaurant.name);
            div2.append(newH3);
            var newImg = $("<img>");
            if (data.restaurants[i].restaurant.thumb !== "") {
            newImg.attr("src", data.restaurants[i].restaurant.thumb);
            newImg.attr("id", "product")
            div2.append(newImg);
        } else {
            newImg.attr("src", "assets/imgs/comingsoon.png");
            newImg.attr("id", "product")
            div2.append(newImg);
            }
            var divContainer = $("<div>");
            divContainer.attr("class", "drink-info");
            newDiv.append(divContainer);
            var newH5 = $("<h5>");
            newH5.text("Address:")
            divContainer.append(newH5);
            var div4 = $("<div>");
            div4.attr("class", "ingredients");
            divContainer.append(div4)
            var pOne = $("<p>");
            pOne.text(data.restaurants[i].restaurant.location.address);
            div4.append(pOne);
            var div3 = $("<div>");
            div2.attr("class", "ingredients");
            divContainer.append(div3);
            var nextH5 =  $("<h5>");
            nextH5.text("Phone:");
            div2.append(nextH5)
            var newP = $("<p>");
            newP.text(data.restaurants[i].restaurant.phone_numbers);
            div2.append(newP);
            var hoursH5 = $("<h5>");
            hoursH5.text("Hours:");
            divContainer.append(hoursH5);
            var hoursP = $("<p>");
            hoursP.attr("class", "instructions");
            hoursP.text(data.restaurants[i].restaurant.timings);
            divContainer.append(hoursP);
            var cuisineH5 = $("<h5>");
            cuisineH5.text("Cuisine:");
            divContainer.append(cuisineH5);
            var cuisineP = $("<p>");
            cuisineP.attr("class", "instructions");
            cuisineP.text(data.restaurants[i].restaurant.cuisines);
            divContainer.append(cuisineP);



            }  

        });

    });

});
