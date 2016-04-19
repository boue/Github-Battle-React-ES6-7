var axios = require('axios');

function getUserInfo(username){
  return axios.get('https://api.github.com/users/' + username)
}

//fetch github to get usernames repos
function getRepos(username){
 return axios.get('https://api.github.com/users/' + username + '/repos?per_page=100') 
}
//calculate all the stars user has
function getTotalStars(repos) {
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0) //start at 0
}
//fetch repos and pass that info to getTotalstars and return obj
function getPlayersData(player){
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars){
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}
//take in both players and return array that determins winner
function calculateScores(players){
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

var helpers = {
  getPlayersInfo: function(players) {
    //axios.all is given an array of promises and when each are done resolving
    //.then function is going to run
    return axios.all(players.map(function(username){
      return getUserInfo(username)
    })).then(function (info) {
      return info.map(function (user) {
        return user.data;
      })
    }).catch(function(err){
      console.warn('ERROR in getPlayersInfo', err);
    })
  },
  battle: function(players){
    //both players are promises
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);
    //when both promises resolve
    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function (err) {console.warn('Error in getPlayersInfo: ', err)})
  }
};

module.exports = helpers;