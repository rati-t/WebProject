const ApiOptions = {
    "playerInfo": "player.profile.data",
    "countryPlayer": "player.country.players.data",
    "availableArchieves": "player.available.archieves.data",
    "monthlyArchieves": "player.monthly.archieves.data",
}

const EndingTypes = {
    "win": "<kbd class='bg-success'>1</kbd>",
    "checkmated": "<kbd class='bg-danger'>0</kbd>",
    "agreed": "<kbd class='bg-dark'>½</kbd>",
    "repetition": "<kbd class='bg-dark'>½</kbd>",
    "timeout":"<kbd class='bg-danger'>0</kbd>",
    "resigned": "<kbd class='bg-danger'>0</kbd>",
    "stalemate": "<kbd class='bg-dark'>½</kbd>",
    "lose": "<kbd class='bg-danger'>0</kbd>",
    "insufficient": "<kbd class='bg-dark'>½</kbd>",
    "50move": "<kbd class='bg-dark'>½</kbd>",
    "abandoned": "<kbd class='bg-danger'>0</kbd>",
    "kingofthehill": "<kbd class='bg-danger'>0</kbd>",
    "threecheck": "<kbd class='bg-danger'>0</kbd>",
    "timevsinsufficient": "<kbd class='bg-dark'>½</kbd>",
    "bughousepartnerlose": "<kbd class='bg-danger'>0</kbd>",
}

const GameTypes = {
    "blitz": "<img src='./Images/blitz.png'>",
    "bullet": "<img src='./Images/bullet.png'>",
    "daily": "<img src='./Images/daily.png'>",
    "daily960": "<img src='./Images/daily960.png'>",
    "puzzles": "<img src='./Images/puzzles.png'>",
    "rapid": "<img src='./Images/rapid.png'>",
}