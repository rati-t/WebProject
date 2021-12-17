const getFlagEmoji = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt()))
const DefaultProfileUrl = "https://www.chess.com/bundles/web/images/user-image.007dad08.svg";
const tableHeaderDiv =`<div class="container my-4 row bg-success border mx-auto border-white rounded-bottom rounded-top text-dark">
                            <div class="col mx-auto text-center h2">Type</div>
                            <div class="col mx-auto text-center h2">Players</div>
                            <div class="col mx-auto text-center h2">Game</div>
                            <div class="col mx-auto text-center h2">Date</div>
                       </div >`
var currentPlayer;
var searchButton;
var searchInput;
var searchSpinner;
var mainWrapper;

$(document).ready(function () {
    
     $('[data-toggle="tooltip"]').tooltip()
    
    searchButton = $("#searchPlayerButton");
    searchInput = $("#searchPlayer");
    searchSpinner = $("#searchSpinner");
    mainWrapper = $("#profileWrapper");

    searchButton.click(function () {
        initiateSearch(searchInput[0].value)
    });

});

function initiateSearch(nickname) {

    searchInput[0].value = nickname;
    currentPlayer = "";

    searchButton.addClass("disabled");
    mainWrapper.addClass("d-none");
    $("#failWrapper").addClass("d-none");
    $("#gamesWrapper").addClass("d-none")

    searchSpinner.removeClass("d-none")

    var id = nickname;

    $.ajaxSetup({ async: false });

    var OptionString = ApiOptions["playerInfo"];

    $.get('/Home/Get', { option: OptionString, args: JSON.stringify([id]) }, function (data) {
        if (data == -1) {

            searchSpinner.addClass("d-none");
            searchButton.removeClass("disabled")

            $("#failWrapper").removeClass("d-none");
        } else {

            currentPlayer = data.username;

            updateProfileData(data);

            receiveMonthlyArchieves(id, new Date().getUTCFullYear(), new Date().getUTCMonth() + 1,);
        }
    })
}

function updateProfileData(data) {
    
    var lastOnlineDate = timeConverter(data.last_online);
    var JoinedDate = timeConverter(data.joined);
    var iso = data.country.split("/")[data.country.split("/").length - 1];
    $("#onlineStatus").text(determineOnlineStatus(data.last_online))
    $("#joined").text(JoinedDate.date + " " + JoinedDate.month + " " + JoinedDate.year);
    $("#followers").text(data.followers);

    if (data.avatar != null) {
        $("#profilePicture").attr("src", data.avatar);
    } else {
        $("#profilePicture").attr("src", DefaultProfileUrl);
    }
    
    $("#nickname").text(data.username);
    $("#realName").text(data.name);
    $("#countryFlag").text(getFlagEmoji(iso));
    $("#countryFlag").attr("data-original-title", countryListAlpha2[iso]);
}

function receiveMonthlyArchieves(id, currentYear, currentMonth) {

    var OptionString = ApiOptions["monthlyArchieves"];

    $.get('/Home/Get', { option: OptionString, args: JSON.stringify([id, currentYear, currentMonth]) }, function (data) {
        if (data == -1) {
            var h1 = document.createElement("h1");
            h1.innerText = "No recent games was found"
            $("#gamesWrapper").removeClass("d-none")
            $("#gamesWrapper").append(h1);
        } else {
            searchButton.removeClass("disabled")
            mainWrapper.removeClass("d-none");
            $("#gamesWrapper").removeClass("d-none");

            searchSpinner.addClass("d-none");

            $("#gamesWrapper")[0].innerHTML = tableHeaderDiv;

            for (var index = data.games.length - 1; index >= 0; index--) {

                var game = data.games[index];
                var mainDiv = document.createElement("div");

                var usernameDiv = document.createElement("div");
                var whiteUsername = document.createElement("h5");
                var blackUsername = document.createElement("h5");

               
                $(matchDiv).append(matchLink);

                
                if (game.black.username != currentPlayer) {
                    whiteUsername.innerHTML = game.white.username + " (" + game.white.rating + ") " + EndingTypes[game.white.result];
                    blackUsername.innerHTML = "<h5 class='d-inline otherPlayers' onclick='initiateSearch(this.innerText)'>" + game.black.username + "</h5>" + " (" + game.black.rating + ") " + EndingTypes[game.black.result];
                }
                if (game.white.username != currentPlayer) {
                    whiteUsername.innerHTML = "<h5 class='d-inline otherPlayers' onclick='initiateSearch(this.innerText)'>" + game.white.username + "</h5>" + " (" + game.white.rating + ") " + EndingTypes[game.white.result];
                    blackUsername.innerHTML = game.black.username + " (" + game.black.rating + ") " + EndingTypes[game.black.result];
                }

                $(usernameDiv).append(whiteUsername, blackUsername)

                var gameTypeDiv = document.createElement("div");
                gameTypeDiv.innerHTML = GameTypes[game.time_class];
                $(gameTypeDiv).attr("class","container col m-auto text-center")

                var matchDiv = document.createElement("div");
                var matchLink = document.createElement("a");
                matchLink.href = game.url;
                matchLink.innerText = "Analyze";
                $(matchDiv).attr("class", "container col m-auto text-center");
                $(matchLink).attr("class", "text-decoration-none text-success h2")

                var dateDiv = document.createElement("div");
                var dateText = document.createElement("h1");
                dateText.innerText = timeConverter(game.end_time).month + " " + timeConverter(game.end_time).date + " " + timeConverter(game.end_time).year;
                $(dateDiv).attr("class", "container col m-auto text-center");
                $(dateText).attr("class", "h4 text-white");

                $(dateDiv).append(dateText);

                $(mainDiv).attr("class", "container my-2 row bg-secondary border mx-auto border-white rounded-bottom rounded-top");
                $(usernameDiv).attr("class", "container col text-white")

                $(mainDiv).append(gameTypeDiv, usernameDiv, matchDiv, dateDiv);
                $("#gamesWrapper").append(mainDiv);
            }
        }
    });
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = {
        'date': date,
        'year': year,
        'month': month,
        'hour': hour,
        'min': min,
        'sec': sec,
    }
    return time;
}

function determineOnlineStatus(lastOnlineDate) {
    var today = Math.round((new Date()).getTime() / 1000);
    if (today - lastOnlineDate > 86400) {
        return lastOnlineDate.date + " " + lastOnlineDate.month + " " + lastOnlineDate.year;
    } else if (today - lastOnlineDate > 3600) {
        return parseInt((today - lastOnlineDate) / 3600) + " hour ago";
    } else if (today - lastOnlineDate > 60) {
        return parseInt((today - lastOnlineDate) / 60) + " minute ago";
    } else {
        return "Online Now"
    }
}

