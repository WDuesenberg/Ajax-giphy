$(document).ready(function() {
    
    var characters = [
        "Saitama", "Naruto", "Goku", "Faye Valentine", "Edward Elric"];

    // function to make buttons and add to the page    
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

    $(document).on("click", ".anime-button", function() {
        $("#characters").empty();
        $(".anime-button").removeClass("active");
        $(this).addClass("active");

        var character = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=NzRPoo8Ds2KfUEoSaHR1ma9GnIvJ1Q92&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class\"anime-item\">");
                
                // var rating = results[i].rating;

                // var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                
                var animeImage = $("<img>");
                animeImage.attr("src", still);
                animeImage.attr("data-still", still);
                animeImage.attr("data-animate", animated);
                animeImage.attr("data-state", "still");
                animeImage.addClass("anime-image");

                // gifDiv.prepend(p);
                gifDiv.prepend(animeImage);

                $("#characters").prepend(gifDiv);
            }
        });
});

$(document).on("click", ".anime-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#add-character").on("click", function(event) {
    event.preventDefault();
    var newAnime = $("input").eq(0).val();

    if (newAnime.length > 2) {
        characters.push(newAnime);
    }

    populateButtons(characters, "anime-button", "#anime-button");

});

    populateButtons(characters, "anime-button", "#anime-button");
});
