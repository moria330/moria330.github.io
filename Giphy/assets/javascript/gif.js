//create an array for default buttons called topics
//populate array according to a theme
//set a static image to start with

var topics = ["rock", "paper", "scissors"];

$(document).ready(function() {

    function newButtons() {
        for (var i = 0; i < topics.length; i++) {
            var b = $("<button>");
            b.addClass("btn btn-primary topics");
            b.attr("topic-name", topics[i]);
            b.text(topics[i]);
            $(".buttons").append(b);

        }
    }
    console.log("first");
    $(document).on("click", ".topics", displayGifs);

    function displayGifs() {
        console.log("On Click of button");
        $(".images").empty();
        var name = $(this).attr('topic-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log("queryURL: " + queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function(response) {
            var results = response.data;
            console.log(response);
            for (var j = 0; j < results.length; j++) {
                var rating = results[j].rating;
                console.log(rating);
                var a = $("<div>");
                var g = $("<img>");
                var fixed = results[j].images.original_still.url;
                a.attr("class", "col-lg-6");
                a.html('<p> Rating: ' + rating + '</p>');
                g.attr("src", fixed);
                g.attr("data-still", fixed);
                g.attr("data-animate", results[j].images.original.url);
                g.attr("data-state", "still");
                g.attr("class", "gif col-lg-6");

                $(".images").append(a);
                a.append(g);
                if (j % 2 === 0) {
                    var r = $("<div>");
                    r.attr("class", "row");
                    $(".images").append(r);
                }
            }


        });



    }
    $(document).on("click", ".gif", toggleGifs);

    function toggleGifs() {
        var state = $(this).attr("data-state");

        if (state == "still") {
            var animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
            console.log("if still");
        } else { //for some reason this is called instantly after clicking a new button on top instead of waiting for a user click
            var still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
            console.log("if animate");
        }
    }

    newButtons();
    //Add a new topic from the user
    $(document).on("click", "#submit",
        function(event) {
            event.preventDefault();
            var topic = $("#addItem").val().trim();
            topics.push(topic);
            $(".buttons").empty();
            newButtons();
        });

    displayGifs();

});