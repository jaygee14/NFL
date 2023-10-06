function getGames() {
    return new Promise((resolve, reject) => {
        fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
            .then(response => response.json())
            .then(jsonResponse => resolve(jsonResponse.events))
    })
}

function addElementey(element, clasName) {
    const div = document.createElement(element);
    div.classList.add(clasName);
    return div;
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
    const answer = { images: img_links, scores: scores }
    console.log(answer.images)
    return answer
}

function generateScoreboard(object) {
    const scoreboard = document.getElementById('scoreBoard');
    const div = addElementey('div', 'game');
    const team = addElementey('div', 'team');
    const team2 = addElementey('div', 'team');

    div.appendChild(team);
    div.appendChild(team2);
    scoreboard.appendChild(div)

    i = 0;
    x = 0;
    y = 1;

    for (img of object.images){
        const game = document.getElementsByClassName('game');
        const opponent = document.getElementsByClassName('team');
        //create elements
        const awayImg = document.createElement('img')
        const awayScore = document.createElement('p')
        //add assets
        awayImg.src = img[0];
        awayScore.textContent = object.scores[i][0]
        //add to div
        opponent[x].appendChild(awayImg);
        opponent[x].appendChild(awayScore);
        game[i].appendChild(opponent[x]);

        const tag = addElementey('p', 'tag');
        tag.textContent = 'vs';

        const homeImg = document.createElement('img')
        const homeScore = document.createElement('p')
        //add assets
        homeImg.src = img[1];
        homeScore.textContent = object.scores[i][1]
        //add to div
        opponent[y].appendChild(homeImg);
        opponent[y].appendChild(homeScore);
        game[i].appendChild(tag);
        game[i].appendChild(opponent[y]);

        scoreboard.appendChild(game[i])

        const div2 = addElementey('div', 'game')
        const teamOne = addElementey('div', 'team');
        const teamTwo = addElementey('div', 'team');

        div2.appendChild(teamOne);
        div2.appendChild(teamTwo);
        scoreboard.appendChild(div2);

        i++;
        y = y + 2;
        x = x + 2;
    }
}

function printData(data) {
    console.log(data[0].competitions[0].competitors[0].score)
}
getGames().then(getData).then(generateScoreboard)