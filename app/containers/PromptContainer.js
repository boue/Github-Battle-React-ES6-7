import React, { Component } from 'react'
import Prompt from '../components/Prompt'

class PromptContainer extends Component {
  constructor(){
    super()
    this.state = {
      username: ''
    }
  }
  handleSubmitUser (e) {
    e.preventDefault();
    const { username } = this.state
    this.setState({
      username: ''
    });

    const { playerOne } = this.props.routeParams
    if (playerOne) {
      var pathname = 
      this.context.router.push({
        pathname: '/battle',
        query: {
          //playerOne: playerOne, since same can write as one
          playerOne,
          playerTwo: username,
        }
      })
    } else {
      this.context.router.push(`/playerTwo/${username}`)
    }
  }
  handleUpdateUser (event){
    this.setState({
      username: event.target.value
    });
  }
  render () {
    return (
      <Prompt
        onSubmitUser={() => this.handleSubmitUser()}
        onUpdateUser={() => this.handleUpdateUser()}
        header={this.props.route.header}
        username={this.state.username} />
    )
  }  
}

PromptContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default PromptContainer