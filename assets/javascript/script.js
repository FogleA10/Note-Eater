// initialize variable to store searched artist history
var artistHistory = [];
// CONSTANTS
// # of songs to display for each artist searched
var songLimit = 8;
// max length of artists to store
var historyLimit = 8; 
// API keys
apiKey = [
    "AIzaSyBLlzSDytVY85LZFVhQJHeHMXn-jQsel7M",
    "AIzaSyDm8f3Koswf1WpkB-PZREX1MdyEFY3O96U",
    "AIzaSyAJv7TNfiUjyTSe7zlbFq5Iz12C71vpgO0",
    "AIzaSyCJisPCVfrIHX2O3gEgPrHjTXqqzP-27xo",
    "AIzaSyCcYQAsfiT7nK-WGIKco6qBWhti82QOnPE"
];

keyNum = 0;

var getSongs = function(artist) {
    // must add quotes to artist name for url to accept artists with spaces in name 
    artistQuotes = "\"" + artist + "\"";
    var apiUrl = "https://www.songsterr.com/a/ra/songs/byartists.json?artists=" + artistQuotes;

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

var displaySongs = function(data) {
    console.log(data)
    // get case-correct name from api data
    artist = data[0].artist.nameWithoutThePrefix;
    // add to history if not already in search history
    if (!artistHistory.includes(artist)) {
        addHistory(artist);
    }

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
        var songLink = "https://www.songsterr.com/a/wa/song?id=" + data[i].id;
    
        searchTerm = songName + " " + artist;
        getVideos(searchTerm);
        //musicFrame(songLink);
    })
}

// youtube api
var getVideos = function(searchTerm) {
    console.log(searchTerm)
    // cycle available api keys each fetch to mitigate youtube api quota limit
    keyNum++;
    // if hit key length, start back at first key
    if (keyNum == apiKey.length) {
        keyNum = 0;
    }
    // store key number to minimize overuse of first keys in list due to reload resetting
    localStorage.setItem("keyNum", JSON.stringify(keyNum));

    var key = apiKey[keyNum];
    var apiUrl2 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + searchTerm + "&key=" + key;
    fetch(apiUrl2)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var videoID = data.items[0].id.videoId;
            console.log(data)
            var videoLink = "https://www.youtube.com/watch?v=" + data.items[0].id.videoId;
            console.log(videoLink);
            $("#video").attr("src", "https://www.youtube.com/embed/" + videoID);
            $("#content-link").show();
    })

}

// add artist to search dropdown and store to local storage
var addHistory = function(artist) {
    // create new button in search history section
    var buttonEl = $("<button>")
        .addClass("btn-history waves-effect waves-light btn col s12")
        .text(artist);

    // if history reaches the limit, remove oldest search result element
    if ($("#search-history").length == historyLimit) {
        // remove from page
        $("#search-history").eq(0).remove();
        // remove from local storage variable
        artistHistory = artistHistory.slice(1, artistHistory.length);
    }

    // add new artist to artist history list on page
    $("#search-history").append(buttonEl);
    // add new artist to local storage
    artistHistory.push(artist);
    localStorage.setItem("artists", JSON.stringify(artistHistory));
}

// load search history from local storage and add to search dropdown menu
var loadHistory = function () {
    for (i = 0; i < artistHistory.length; i++) {
        // create new button in search history section
        var buttonEl = $("<button>")
            .addClass("btn-history waves-effect waves-light btn col s12")
            .text(artistHistory[i]);
            // append to end of options list
            $("#search-history").append(buttonEl);
    }
}

var clearResults = function() {
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
}

$("#submit-btn").click(function() {
    // get submitted artist name
    var artist = $("#band-text-box").val();
    // clear previous results if exits
    clearResults();
    // get api data for artist
    getSongs(artist);
});

// when user clicks (x) with id="close-modal" on the modal, clear modal text and close it
$("#close-modal").click(function() {
    $("#modal-alert").text("");
    $(".modal").hide();
    console.log("modal close")
})

// look for key start point in storage
if (localStorage.getItem("keyNum")) {
    keyNum = JSON.parse(localStorage.getItem("keyNum"));
}

// if there are saved artists in local storage, load to page
if (localStorage.getItem("artists")) {
    artistHistory = JSON.parse(localStorage.getItem("artists"));
    loadHistory();
}

// when user clicks option in search history dropdown, retrieve and print artist data
$("#search-history").on("click", "button", function() {
    artist = $(this).text();
    console.log("function ran")
    clearResults();
    getSongs(artist);
})