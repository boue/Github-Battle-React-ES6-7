import React from 'react'
import ConfirmBattle from '../components/ConfirmBattle'
import { getPlayersInfo } from '../utils/githubHelpers'

const ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState () {
    return {
      isLoading: true,
      playersInfo: [],
    }
  },
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
  },
  //react-router lets you push props to new routes (data we got from promises)
  handleInitiateBattle() {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    })
  },
  render () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        onInitiateBattle={this.handleInitiateBattle}
        playersInfo={this.state.playersInfo} />
    )
  }
});

export default ConfirmBattleContainer