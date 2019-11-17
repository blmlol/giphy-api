// The topic will be instruments
var topics = ['cello', 'violin', 'bass', 'piano', 'guitar', 'ukulele', 'banjo', 'trumpet', 'saxophone'];

//We need a function to render the buttons and display them on the page; we have a set number of buttons on page start from the above array
function renderButtons(array) {
    $('#buttons').empty();
    for (var i = 0; i < array.length; i++) {
        $('#buttons').append($('<button class="button mr-2 text-info font-weight-bold" id="' + array[i] + '">' + array[i].toUpperCase() + '</button> '))
    }

}

//Here we have a simple onclick listener for the add gif button; checks for duplicate instruments
$(document).ready(function () {

    $('#add-gif').on('click', function (event) {
        event.preventDefault();
        var gif = $('#gif-input').val().trim();
        if (!topics.includes(gif)) {

            topics.push(gif);
        }
        else {
            alert("Please add a new instrument")
        }
        $('#gif-input').val('');
        renderButtons(topics);

    })
})

//We need a function to display the gifs to the page from the ajax call
function displayGif() {
    var gifName = $(this).attr('id')
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mOcmXHigsqCSutonF7VxoucEEmXp8pCG&q=" + gifName + "&limit=10&rating=&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //Loop through the response data and dynamically prepend gifs to the span gifs-here
        for (var i = 0; i < response.data.length; i++) {

            $("#gifs-here").prepend($("<img id='gif' data-still='" + response.data[i].images.original_still.url + "' " + "data-state='" + "still' " + "data-animate='" + response.data[i].images.original.url + "'" + "src = '" + response.data[i].images.original_still.url + "'> <br> <p> Rating: " + (response.data[i].rating).toUpperCase() + "</p>"))


        }
        console.log(response);

    })



}
//Here we have an onclick event listener to see if the gif has been clicked on or not
$(document).on("click", '#gif', function () {
    //We check the state of the gif to see if it is still or animated (When we dynamically display the gif, it's default state is still)
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

renderButtons(topics);
$(document).on("click", ".button", displayGif);

