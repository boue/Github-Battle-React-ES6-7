import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../main.css' //webpack enabled 

//Main needs to take responsibility for rendering child component
//need child el to have key, clone element and add attribute key
const Main = React.createClass({
  render (){
    return (
      <div className='main-container'>
        <ReactCSSTransitionGroup
          transitionName="appear"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
            {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

export default Main