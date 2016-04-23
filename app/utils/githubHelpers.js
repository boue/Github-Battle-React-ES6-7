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
async function getPlayersData(player){
  try {
    const repos = await getRepos(player.login)
    const totalStars = await getTotalStars(repos)
    return {
      followers: player.followers,
      totalStars
    }  
  } catch (error) {
    console.log('githubHelpers error in getPlayersData ', error)
  }
}
//take in both players and return array that determins winner
function calculateScores(players){
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

export async function getPlayersInfo (players) {
  try {
    const info = Promise.all(players.map((username) => getUserInfo(username)))
    return info.map((user) => user.data)
  } catch (error) {
    console.warn('Error in getPlayersInfo: ', error)
  } 
}

export async function battle (players){
  //both players are promises
  try {
    const playerOneData = getPlayersData(players[0]);
    const playerTwoData = getPlayersData(players[1]);
    const data = await Promise.all([playerOneData, playerTwoData])
    return await calculateScores(data)  
  } catch (error) {
    console.warn('Error in battle: ', error)
  }
}
