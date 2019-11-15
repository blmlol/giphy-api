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

        renderButtons(topics);

    })
})

renderButtons(topics);