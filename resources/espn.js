function getGames() {
    return new Promise((resolve, reject) => {
        fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
            .then(response => response.json())
            .then(jsonResponse => resolve(jsonResponse.events))
    })
}

function getImg(data) {
    let img_links = []

    for (game of data) {
        img_links.push(game.competitions[0].competitors[1].team.logo)
        img_links.push(game.competitions[0].competitors[0].team.logo)
    }
    return [img_links]
}

getGames().then(getImg)