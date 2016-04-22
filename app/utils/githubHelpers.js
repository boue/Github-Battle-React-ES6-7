import axios from 'axios'

function getUserInfo(username = 'boue'){
  return axios.get(`https://api.github.com/users/${username}`)
}

//fetch github to get usernames repos
function getRepos(username = 'boue'){
 return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`) 
}
//calculate all the stars user has
//arrow function returns anything on its line
function getTotalStars(repos) {
  return repos.data.reduce((prev, current) => prev + current.stargazers_count, 0) //start at 0
}  
//fetch repos and pass that info to getTotalstars and return obj
function getPlayersData(player){
  return getRepos(player.login)
    .then(getTotalStars)
    .then((totalStars) => (
      {
        followers: player.followers,
        totalStars
      }
    ))
}
//take in both players and return array that determins winner
function calculateScores(players){
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

export function getPlayersInfo (players) {
  //axios.all is given an array of promises and when each are done resolving
  //.then function is going to run
  return axios.all(players.map((username) => getUserInfo(username)))
    .then((info) => info.map((user) => user.data))
    .catch(function(err) {console.warn('ERROR in getPlayersInfo', err)})
}
export function battle (players){
  //both players are promises
  const playerOneData = getPlayersData(players[0]);
  const playerTwoData = getPlayersData(players[1]);
  //when both promises resolve
  return axios.all([playerOneData, playerTwoData])
    .then(calculateScores)
    .catch(function (err) {console.warn('Error in getPlayersInfo: ', err)})
}
