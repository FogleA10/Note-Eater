// initialize variable to store searched artist history
var artistHistory = [];
// CONSTANTS
// # of songs to display for each artist searched
var songLimit = 8;
// max length of artists to store
var historyLimit = 10; 

var getSongs = function(artist) {
    // must add quotes to artist name for url to accept artists with spaces in name 
    artist = "\"" + artist + "\"";
    console.log(artist)
    var apiUrl = "http://www.songsterr.com/a/ra/songs/byartists.json?artists=" + artist;

    // fetch request to url
    fetch(apiUrl)
        .then(function(response) {
            // if successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
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
        // stop running if there are less songs available than our song limit
        if (i < data.length) {
            var listEl = $("<li>")
                .addClass("song")
                .text(data[i].title);
            // append song to <ol>
            $(".songs").append(listEl);
        }
    }

}

$("#submit-btn").click(function() {
    // get submitted artist name
    var artist = $("#band-text-box").val();
    // clear search box
    $("#band-text-box").val("");
    // display artist name on page
    $(".band-name-searched").text(artist);
    // clear any previous songs listed
    if ($(".songs").children().length) {
       $(".songs").children().each(function() {
           $(this).remove();
       });
    }
    // get api data for artist
    getSongs(artist);
});

// when user clicks (x) with id="close-modal" on the modal, clear modal text and close it
$("#close-modal").click(function() {
    $("modal-alert").text("");
    $("modal").hide();
})