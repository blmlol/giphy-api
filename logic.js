// The topic will be instruments
var topics = ['cello', 'violin', 'bass', 'piano', 'guitar', 'ukulele', 'banjo', 'trumpet', 'saxophone'];

function renderButtons(array) {
    $('#buttons').empty();
    for (var i = 0; i < array.length; i++) {
        $('#buttons').append($('<button class="button mr-2 text-info font-weight-bold" id="' + array[i] + '">' + array[i].toUpperCase() + '</button> '))
    }

}


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

function displayGif() {
    var gifName = $(this).attr('id')
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mOcmXHigsqCSutonF7VxoucEEmXp8pCG&q=" + gifName + "&limit=10&rating=&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {

            $("#gifs-here").prepend($("<img id='gif' src = '" + response.data[i].images.original.url + "'> <br> <p> Rating: " + (response.data[i].rating).toUpperCase() + "</p>"))


        }
        console.log(response);
    })



}
renderButtons(topics);
$(document).on("click", ".button", displayGif);

