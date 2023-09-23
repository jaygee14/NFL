function getGames() {
    return new Promise((resolve, reject) => {
        fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
            .then(response => response.json())
            .then(jsonResponse => resolve(jsonResponse.events))
    })
}

function getData(data) {
    let img_links = [];
    let scores = []

    for (game of data) {
        let images = []
        let games = []
        images.push(game.competitions[0].competitors[1].team.logo)
        images.push(game.competitions[0].competitors[0].team.logo)

        games.push(game.competitions[0].competitors[1].score)
        games.push(game.competitions[0].competitors[0].score)

        scores.push(games)
        img_links.push(images)
    }
    const answer = { images: [img_links], scores: [scores] }
    console.log(answer.images)
    return answer
}

function generateScoreboard(object) {
    const scoreboard = document.getElementById('scoreBoard');
    const div = document.createElement('div');
    div.classList.add('game');

    scoreboard.appendChild(div)

    i = 0;

    for (img of object.images){
        const game = document.getElementsByClassName('game')
        const div = document.createElement('div')
        div.classList.add('game')
        //create elements
        const awayImg = document.createElement('img')
        const awayScore = document.createElement('p')
        //add assets
        awayImg.src = img[i][0];
        awayScore.textContent = object.scores[i][0][0]
        const tag = document.createElement('p')
        tag.textContent = 'vs';
        tag.classList.add('tag')
        //add to div
        game[i].appendChild(awayImg);
        game[i].appendChild(awayScore);
        game[i].appendChild(tag);

        const homeImg = document.createElement('img')
        const homeScore = document.createElement('p')
        //add assets
        homeImg.src = img[i][1];
        homeScore.textContent = object.scores[i][0][1]
        //add to div
        game[i].appendChild(homeImg);
        game[i].appendChild(homeScore);

        scoreboard.appendChild(div)
        i++
    }
}

function printData(data) {
    console.log(data[0].competitions[0].competitors[0].score)
}
getGames().then(getData).then(generateScoreboard)