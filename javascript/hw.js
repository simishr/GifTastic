var animalList = ["Dolphin", "Whale", "Shark", "Starfish", "Seahorse", "Jellyfish", "Turtle", "Crab"];


function displayGifsAndInfos() {

	var marine = $(this).attr("data-name");
	var myKey = "&api_key=dc6zaTOxFJmzC";
	var queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + marine + myKey;

	$.ajax({
		url: queryURL,
		method: "GET" 
	}).done(function (response) {
			console.log(response);

			for(var j = 0; j < response.data.length; j++) {

				var animalHolder = $("<div class='item'>");

				var ratingHolder = $("<div>").addClass("ratingClass");
				$("#gif-area").append(ratingHolder);
				console.log(response.data[j].rating);
				ratingHolder.html(response.data[j].rating);

				var imageHolder = $("<img>").addClass("imageClass");
				$("#gif-area").append(imageHolder);
				console.log(response.data[j].images.fixed_height_still.url);
				imageHolder.attr("src", response.data[j].images.fixed_height_still.url);
				
				//	gif-portion
				// var gifHolder = $("<img>").addClass("gifClass");
				// $("#animal-form").append(gifHolder);
				// console.log(response.data[j].images.fixed_height.url);
				// gifHolder.attr("src",response.data[j].images.fixed_height.url);
			}
		});
}


function renderButtons() {

	 $("#marineButtons").empty();

	for (var i = 0; i < animalList.length; i++) {
		var a = $("<button>").addClass("marine-class").attr("data-name", animalList[i]).text(animalList[i]);
		$("#marineButtons").append(a);
	}
}

	$("#add-animal").on("click", function(event) {
		event.preventDefault();
		var animal = $("#animal-input").val().trim();
		animalList.push(animal);
		renderButtons();
	});

	$(document).on("click", ".marine-class", displayGifsAndInfos);
	renderButtons();

	$("#form-id").on("click", function() {
		console.log("works");
		console.log(this);
		$("#form-id").attr("src", this.images.fixed_height.url);

	});


