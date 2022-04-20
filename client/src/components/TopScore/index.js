import React from 'react'

const TopScore = (score) => {
  return (
    <div className='TopScoreDiv'>
        <h3 className="TopScoreH3">TOP SCORE</h3>
        <p className="TopScoreRank">Rank: {score.rank}</p>
        <p className="TopScoreName">Player Name: {score.score.username} </p>
        <p className="TopScoreScore">Player score: {score.score.score} </p>
    </div>
  )
}

export default TopScore