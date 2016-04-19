import React, { PropTypes } from 'react'

//same as passing user as arg and then const { score, info } = user before return
function UserDetails ({score, info}) {
  return (
    <div>
      {!!score && <li className="list-group-item"><h3>Score: {score}</h3></li>}
      <li className="list-group-item"> <img src={info.avatar_url} className="img-rounded img-responsive"/></li>
      {info.name && <li className="list-group-item">Name: {info.name}</li>}
      <li className="list-group-item">Username: {info.login}</li>
      {info.location && <li className="list-group-item">Location: {info.location}</li>}
      {info.company && <li className="list-group-item">Company: {info.company}</li>}
      <li className="list-group-item">Followers: {info.followers}</li>
      <li className="list-group-item">Following: {info.following}</li>
      <li className="list-group-item">Public Repos: {info.public_repos}</li>
      {info.blog && <li className="list-group-item">Blog: <a href={info.blog}> {info.blog}</a></li>}
    </div>
  )
}

UserDetails.propTypes = {
  score: PropTypes.number,//optional if no score don't do anything
  //allows to have proptypes based on certain key values in obj
  info: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    blog: PropTypes.string, //not necessarily required because sometimes user doesn't have it
    company: PropTypes.string,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    location: PropTypes.string,
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    public_repos: PropTypes.number.isRequired,
  })
}

export default UserDetails