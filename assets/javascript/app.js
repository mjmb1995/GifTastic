var topics = ['birthday', 'christmas', 'easter', 'halloween', 'new years', 'thanksgiving', 'wedding'];

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
})
// Calling the renderButtons function to display the initial list of topics
renderButtons();