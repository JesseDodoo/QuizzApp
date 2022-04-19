import React from 'react';
import PaginationButtons from '../PaginationButtons';
import { useState, useEffect} from 'react'
import Score from '../Score';
import axios from 'axios';

const Scores = (scores) => {

  let scoreArray = scores.scores;
  let rank = 0;

  return (
    <section>
        score board

        {scoreArray.map((score) => (<Score key = {score.id} score = {score} rank = {rank = rank + 1} /> ) )}

        <PaginationButtons />
    </section>
  )
}

export default Scores