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
            console.log(response)
            // if successful
            if (response.ok) {
                response.json().then(function(data) {
                    if (data.length > 0 )
                    console.log(data);
                    displaySongs(data);
                })
            }
            else {
                // if not successful (artist not valid) show modal pop up 
                // with text alert in <p> element with id="modal-alert"
                $("#modal-alert").text("Artist not found. Please enter a valid artist name.");
                $(".modal").show();
                console.log("modal-success")
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

/* This is the fetch for the youtube api, but we need to dynanically create a variable searchTerm from the song selected by the user to pass into the youtube api
var getVideos = function(searchTerm) {
    var apiUrl2 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + searchTerm + "&key=" + apiKey;
    fetch(apiUrl2)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
})
/* This was my old songsterr api call which I guess is unecessary but just in case
var search = "Bob Dylan";
var apiUrl = "http://www.songsterr.com/a/ra/songs.json?pattern=" + search;
var apiKey = "AIzaSyC9UiXjitcc1HacmkbVO0wCgLoCItoHgvA";
// put into function called by form submit handler
fetch(requestUrl)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
    pullSongs(data);
})
var linkSongs = function(data) {
    let songName1 = data[0].title;
    let songLink1 = "http://www.songsterr.com/a/wa/song?id=" + data[0].id;
    let songName2 = data[1].title;
    let songLink2 = "http://www.songsterr.com/a/wa/song?id=" + data[1].id;
    let songName3 = data[2].title;
    let songLink3 = "http://www.songsterr.com/a/wa/song?id=" + data[2].id;
    let songName4 = data[3].title;
    let songLink4 = "http://www.songsterr.com/a/wa/song?id=" + data[3].id;
    let songName5 = data[4].title;
    let songLink5 = "http://www.songsterr.com/a/wa/song?id=" + data[4].id;
    let songName6 = data[5].title;
    let songLink6 = "http://www.songsterr.com/a/wa/song?id=" + data[5].id;
    let songName7 = data[6].title;
    let songLink7 = "http://www.songsterr.com/a/wa/song?id=" + data[6].id;
    let songName8 = data[7].title;
    let songLink8 = "http://www.songsterr.com/a/wa/song?id=" + data[7].id;
    let songName9 = data[8].title;
    let songLink9 = "http://www.songsterr.com/a/wa/song?id=" + data[8].id;
    let songName10 = data[9].title;
    let songLink10 = "http://www.songsterr.com/a/wa/song?id=" + data[9].id;
    console.log(songLink1);
    console.log(songName1);
}
*/

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
    $("#modal-alert").text("");
    $(".modal").hide();
})