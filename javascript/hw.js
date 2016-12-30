//Array of animals
var animalList = ["Dolphin", "Whale", "Shark", "Starfish", "Seahorse", "Jellyfish", "Turtle", "Crab"];

function displayGifsAndInfos() {

	var marine = $(this).attr("data-name");
	var myKey = "&api_key=dc6zaTOxFJmzC";
	var queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + marine + myKey;

	$("#gif-area").empty();

	//AJAX call for the specific animal button being clicked
	$.ajax({
		url: queryURL,
		method: "GET" 
	}).done(function (response) {

			console.log(response);

			var results = response.data;

			for(var j = 0; j < results.length; j++) {

				var still_URL =  results[j].images.fixed_height_still.url ;
				var gif_URL = results[j].images.fixed_height.url;

				var ratingHolder = $("<div class='ratingClass'>");
				$("#gif-area").append(ratingHolder);
				ratingHolder.html("Rating: " + results[j].rating);

				var imageHolder = $("<img class='imageClass'>");
				
				imageHolder.data("still", still_URL );
				imageHolder.data("gif", gif_URL);
				
				imageHolder.attr("src", still_URL);
				$("#gif-area").append(imageHolder);	
			}
		});
	
	}
	//onclick event handler
	$("#gif-area").on("click",".imageClass" , function() {
		console.log($(this).attr("src"));
		var source_URL = $(this).attr("src");
		var still_URL = $(this).data("still");
		var gif_URL = $(this).data("gif");

		if(source_URL === still_URL){
			$(this).attr("src", gif_URL);
		} else {
			$(this).attr("src", still_URL);
		}

	});


function renderButtons() {
	// Deletes the animals prior to adding new animals
	$("#marineButtons").empty();
	$("#gif-area").empty();
	// Loops through the array of animals
	for (var i = 0; i < animalList.length; i++) {
		//Dynamically generating buttons for each animal in the array.
		var a = $("<button>").addClass("marine-class").attr("data-name", animalList[i]).text(animalList[i]);
		//Added the button to the marineButtons div
		$("#marineButtons").append(a);
	}
}
	// This function handles events where the add animal button is clicked
	$("#add-animal").on("click", function(event) {
		event.preventDefault();
		var animal = $("#animal-input").val().trim();
		animalList.push(animal);
		renderButtons();
	});

	$(document).on("click", ".marine-class", displayGifsAndInfos);
	renderButtons();

	


