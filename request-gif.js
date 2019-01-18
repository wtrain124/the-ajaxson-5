$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    // get the user's input text from the DOM
    var searchQuery = $('#tag').val(); //e.g. "dance"
    var jacksonsNum = $('#no-robot').val();

    if (jacksonsNum != 5) {
      console.log("problem!!!!");
      $("#gif").attr("hidden", true);
      $("#no-robot").attr("style", "border: 3px solid #bc3440");
      $("#denied").attr("style", "color: #bc3440");
      $("#denied").text("No GIF for you!");
    }
    else {
      //clear error messages
      $("#no-robot").attr("style", "border: 1px solid #444444");
      $("#denied").text("");

      // configure a few parameters to attach to our request
      var params = {
          api_key: "dc6zaTOxFJmzC",
          tag : "jackson 5 " + searchQuery // e.g. "jackson 5 dance"
      };
      //console.log(params.tag);

      // make an ajax request for a random GIF
      $.ajax({
          url: "http://api.giphy.com/v1/gifs/search?q=" + params.tag + "&api_key=" + params.api_key,
          success: function(response) {
              // if the response comes back successfully, the code in here will execute.
              // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us

              // 1. sets the source attribute of our image to the image_url of the GIF
              // 2. hides the feedback message and display the image
              var randomPick = Math.floor(Math.random() * 25);
              var randomGif = response.data[randomPick];
              var randomGifURL = randomGif.images.original.url;
              $('#gif').attr("src", randomGifURL);
              setGifLoadedStatus(true);
          },
          error: function() {
              // if something went wrong, the code in here will execute instead of the success function

              // give the user an error message
              $("#feedback").text("Sorry, could not load GIF. Try again!");
              setGifLoadedStatus(false);
          }
        });

        // gives the user a "Loading..." message while they wait
        $("#feedback").text("ABC...GIF Loading in 1,2,3!");
        setGifLoadedStatus(false);
    }
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}