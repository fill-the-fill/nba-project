 
const express = require('express')
const request = require('request')
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

// http://data.nba.net/10s/prod/v1/2018/players.json

app.get('/teams/:teamName', (req, res) => {
    request('http://data.nba.net/10s/prod/v1/2018/players.json', function (request, response) {
    let jsonData = JSON.parse(response.body)
    let playersAr = jsonData.league.standard
    let teamName = req.params.teamName
    let teamID = teamToIDs[teamName]
    const teamMatch =  playersAr.filter(p => p.teamId === teamID)
    const teamIsActive = teamMatch.filter(p => p.isActive)
    const team = teamIsActive.map(x => { return {"firstName": x.firstName, "lastName": x.lastName, "jersey": x.jersey, "pos": x.pos, }})
    res.send(team)
})
})




const port = 8083;
app.listen(port, () => console.log(`Server is running on port ${port}`));


