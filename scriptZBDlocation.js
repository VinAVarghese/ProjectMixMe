
var apiKey = "280fa1637c0958e223d90cbe4eba1bf8";
var cityUrl = "https://developers.zomato.com/api/v2.1/cities?q=newyork&apikey=" + apiKey;

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
        $("#container").append(newDiv);
        var newArticle = $("<article>");
        newArticle.attr("class", "article-row");
        var clickPic = $("<a>");
        clickPic.attr("class", "clickable")
        clickPic.attr("src", data.restaurants[i].restaurant.url)
        clickPic.append(newArticle);
        newDiv.append(clickPic)
        var newDiv = $("<div>");
        newDiv.attr("class", "article-row-img");
        newArticle.append(newDiv);
        var newImg = $("<img>");
        newImg.attr("src", data.restaurants[i].restaurant.thumb);
        newImg.attr("id", "product")
        newDiv.append(newImg);
        var divTitle = $("<div>");
        divTitle.attr("class", `article-row-content ${[i]}`);
        newArticle.append(divTitle);
        var newH3 = $("<h3>");
        newH3.attr("class", "article-row-content-header");
        newH3.text(data.restaurants[i].restaurant.name);
        divTitle.append(newH3);
    }  

    });

});


