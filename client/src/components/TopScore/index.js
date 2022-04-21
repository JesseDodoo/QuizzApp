import React from 'react'

const TopScore = (score) => {
  return (
    <div className='TopScoreContainer'>
        <h3 className="header title">TOP SCORE</h3>
        <div className='TopScoreDiv'>
          <p className="TopScoreItem">#{score.rank}</p>
          <p className="TopScoreItem">Name: {score.score.username} </p>
          <p className="TopScoreItem">Score: {score.score.score} </p>
        </div>
    </div>
  )
}

export default TopScore