import React from 'react'

const Score = (score) => {

  return (
    <div className='ScoreDiv'>
        <p>Rank: {score.rank}</p>
        <p>Player Name: {score.score.username} </p>
        <p>Player score: {score.score.score} </p>
    </div>
  )
}

export default Score