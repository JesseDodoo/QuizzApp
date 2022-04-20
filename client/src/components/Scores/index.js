import React from 'react';
import { useState, useEffect} from 'react'
import Score from '../Score';
import axios from 'axios';
import TopScore from '../TopScore';

const Scores = (scores) => {


  let rank = 0;

  return (
    <section>

        <h3> OTHER SCORES</h3>

        {scores.scores.slice(1).map((score) => (<Score key = {score.id} score = {score} rank = {score.rank} /> ) )}

    </section>
  )
}

export default Scores