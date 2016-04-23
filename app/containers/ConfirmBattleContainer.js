import React, { Component } from 'react'
import ConfirmBattle from '../components/ConfirmBattle'
import { getPlayersInfo } from '../utils/githubHelpers'

class ConfirmBattleContainer extends Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      playersInfo: [],
    }
  }
  //you can run .then on it because it returns a promise
  async componentDidMount () {
    const { query } = this.props.location
    //lets write async code in synch manner
    try {
      //pause execution until getPlayersInfo is resolved
      const players = await getPlayersInfo([query.playerOne, query.playerTwo])
      this.setState({
        isLoading: false,
        playersInfo: [players[0], players[1]]
      })
    } catch (error) {
      console.warn('Error in ConfirmBattleContainer: ', error)
    }
  }
  //react-router lets you push props to new routes (data we got from promises)
  handleInitiateBattle() {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    })
  }
  render () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        //classes in es6 don't autobind this so now we know its good
        onInitiateBattle={() => this.handleInitiateBattle()}
        playersInfo={this.state.playersInfo} />
    )
  }
}

ConfirmBattleContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ConfirmBattleContainer