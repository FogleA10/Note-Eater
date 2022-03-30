// initialize variable to store searched artist history
var artistHistory = [];
// CONSTANTS
// # of songs to display for each artist searched
var songLimit = 8;
// max length of artists to store
var historyLimit = 10; 

var getSongs = function(artist) {
    // must add quotes to artist name for url to accept artists with spaces in name 
    artistQuotes = "\"" + artist + "\"";
    var apiUrl = "http://www.songsterr.com/a/ra/songs/byartists.json?artists=" + artistQuotes;

    // fetch request to url
    fetch(apiUrl)
        .then(function(response) {
            console.log(response)
            // if successful
            if (response.ok) {
                response.json().then(function(data) {
                    if (data.length) {
                        displaySongs(data, artist);
                    }
                    else {
                        $("#modal-alert").text("Artist not found. Please enter a valid artist name.");
                        $(".modal").show(); 
                    }
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

var displaySongs = function(data, artist) {
    // display artist name on page
    $(".band-name-searched").text(artist);
    for (i = 0; i < songLimit; i++) {
        // stop running if there are less songs available than our song limit
        if (i < data.length) {
            var listEl = $("<li>")
                .addClass("song-name")
                .text(data[i].title);
            // append song to <ol>
            $(".songs").append(listEl);
        }
    }
    
    $(".song-name").click(function() {
        var songName = $(this).text();
        var artist = $(".band-name-searched").text();
        var songLink = "http://www.songsterr.com/a/wa/song?id=" + data[i].id;
    
        searchTerm = songName + " " + artist;
        getVideos(searchTerm);
        //musicFrame(songLink);
    })
}

// youtube api
var getVideos = function(searchTerm) {
    console.log(searchTerm)
    var apiKey = "AIzaSyC9UiXjitcc1HacmkbVO0wCgLoCItoHgvA";
    var apiUrl2 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + searchTerm + "&key=" + apiKey;
    fetch(apiUrl2)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var videoID = data.items[0].id.videoId;
        var videoLink = "https://www.youtube.com/watch?v=" + data.items[0].id.videoId;
        console.log(videoLink);
        $("#video").attr("src", "https://www.youtube.com/embed/" + videoID);
        $("#content-link").show();
})

}

$("#submit-btn").click(function() {
    // get submitted artist name
    var artist = $("#band-text-box").val();
    // clear search box
    $("#band-text-box").val("");
    // clear any previous songs listed
    if ($(".songs").children().length) {
       $(".songs").children().each(function() {
           $(this).remove();
       });
    }
    // hide previous videos/links
    $("#content-link").hide();
    // get api data for artist
    getSongs(artist);
});

// when user clicks (x) with id="close-modal" on the modal, clear modal text and close it
$("#close-modal").click(function() {
    $("#modal-alert").text("");
    $(".modal").hide();
    console.log("modal close")
})