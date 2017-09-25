var topics = ['birthday', 'christmas', 'easter', 'halloween', 'new years', 'thanksgiving', 'wedding'];

function displayGifs() {
	// removes gifs currently displayed
	$('#gifBox').empty();
	window.that = this;
	//clicked button will pull gifs based on data-name value
	var topic = $(this).attr("data-name");
	// Giphy URL + search query  + public API key + limit is 10 gifs
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	topic + "&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
		var results = response.data;
	 	window.response = response;
	  // for each of the 10 results create a div and prepend them to the previous div
		for (var i = 0; i < results.length; i++) {
			console.log(results);
		  	// creates a new div for the gif
		    var gifDiv = $("<div>");
		    // stores rating into a var
		    var rating = results[i].rating;
		    // creates a p tag and adds rating text to it
		    var p = $("<p>").text("Rating: " + rating);
		    // creates an image tage
		    var image = $("<img  class='item'>");
		    // assigns the gif url to the image tag
		    image.attr("src", results[i].images.fixed_height_still.url);
		    image.attr('still', results[i].images.fixed_height_still.url);
		    image.attr('animate', results[i].images.fixed_height.url);
		    image.attr('state', 'still');
		    // prepends the rating and the gif to the new gifDiv
		    gifDiv.prepend(p);
		    gifDiv.prepend(image);
		    // prepends the gifDiv to html
		    $("#gifBox").prepend(gifDiv);
	  	}
	});
};

function changeState() {
	var state = $(this).attr('state');
    var animateURL = $(this).attr('animate');
    var stillURL = $(this).attr('still');

    if (state === "still") {
        $(this).attr('src', animateURL);
        $(this).attr('state', 'animate');
      } else {
        $(this).attr('src', stillURL);
        $(this).attr('state', 'still');
      }
};
// function for displaying topic buttons
function renderButtons() {
	// remove existing buttons
	$('#topicButtons').empty();
	// loop through the array and create a button for each item
	for (var i = 0; i < topics.length; i++) {
		var newButton = $('<button>');
		newButton.addClass("topics");
		newButton.attr('data-name', topics[i]);
		newButton.text(topics[i]);
		$('#topicButtons').append(newButton);
	}
}

// function handles events where the add topic button is clicked
$('#add-topic').on('click', function(event) {
	// event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
	event.preventDefault();
	// Grabs the text the user types into the input field
	var topic = $('#topic-input').val().trim();
	// Adds the new topic into topic array
	topics.push(topic);
	// Calling the renderButtons function to display the list of topics + new topic
	renderButtons();
	// clears input text after new button is created
	$('#topic-input').val('');
})
// Adding click event listeners to all elements with a class of "topics"
$(document).on("click", ".topics", displayGifs);

// Clicking on gifs will change states between animate and still
$(document).on("click", ".item", changeState);
// Calling the renderButtons function to display the intial buttons
renderButtons();


