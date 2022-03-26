// initialize variable to store searched artist history
var artistHistory = [];
// CONSTANTS
// # of songs to display for each artist searched
var songLimit = 8;
// max length of artists to store
var historyLimit = 10; 
var stuff =[];

var getSongs = function(artist) {
    // somehow filter songs by popularity with a query string?
    var apiUrl = "http://www.songsterr.com/a/ra/songs.json?pattern=" + artist;

    // fetch request to url
    fetch(apiUrl)
        .then(function(response) {
            // if successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    stuff = data;
                    displaySongs(data);
                })
            }
            else {
                // if not successful (artist not valid) show modal pop up 
                // with text alert in <p> element with id="modal-alert"
                $("#modal-alert").text("Artist not found. Please enter a valid artist name.");
                $("modal").show();
            }
        })   
}

var displaySongs = function(data) {
    for (i = 0; i < songLimit; i++) {
        var listEl = $("<li>")
            .addClass("song")
            .text(data[i].title);
        // append song to <ol>
        $(".songs").append(listEl);
    }

}

$("#submit").click(function() {
    // get submitted artist name
    var artist = $("#band-text-box").val();
    // display artist name on page
    $(".band-name-searched").text(artist);
    // clear any previous songs listed

    // get api data for artist
    getSongs(artist);
});

// when user clicks (x) with id="close-modal" on the modal, clear modal text and close it
$("#close-modal").click(function() {
    $("modal-alert").text("");
    $("modal").hide();
})