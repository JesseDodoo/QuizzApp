import React from 'react'

const Score = (score) => {

  return (
    <div className='ScoreDiv'>
        <p className="ScoreItem">#{score.rank}</p>
        <p className="ScoreItem">Name: {score.score.username} </p>
        <p className="ScoreItem">Score: {score.score.score} </p>
    </div>
  )
}

export default Score