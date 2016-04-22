import React from 'react'
import { transparentBg } from '../styles'

function MainContainer({children}){
  return (
    <div className="jumbotron col-sm-12 text-center" styles={transparentBg}>
      {children}
    </div>
  )
};

export default MainContainer