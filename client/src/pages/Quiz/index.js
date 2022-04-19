import React, { useState } from 'react';
import { BackButton } from '../../components'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate as Navigate } from 'react-router-dom';

function Quiz() {
    const goTo = Navigate();
    const players = useSelector(state => state.players);
    const quiz = useSelector(state => state.quiz);
    const [playerNumber, setPlayerNumber] = useState(Math.floor(Math.random() * players.length));
    const [playerToAnswer, setPlayerToAnswer] = useState(players[playerNumber].playerName);
    const [questionNumber, setQuestionNumber] = useState(0);
    console.log("player to answer", playerToAnswer);
    console.log('playerNumber', playerNumber)
    console.log('the players', players);
    console.log('the question number', quiz.length)

    function renderMultipleChoice() {

    }

    function renderTrueOrFalse() {

    }

    function onSubmitAnswer(e) {
        e.preventDefault()
        console.log("you clicked the button")
        if (playerNumber >= (players.length - 1)) {
            setPlayerNumber(0);
            setPlayerToAnswer(players[0].playerName);
            setQuestionNumber(questionNumber+1)
        }
        else {
            setPlayerNumber(playerNumber + 1);
            setPlayerToAnswer(players[playerNumber + 1].playerName);
            setQuestionNumber(questionNumber+1)

        }
        if(quiz[questionNumber] === quiz[quiz.length-1]){
            goTo('/quiz/results');

        }
    }

    return (<>
        <h1>Quiz page</h1>
        <h2>{playerToAnswer}</h2>
        <form onSubmit={onSubmitAnswer}>
            <h2>question:{!quiz[questionNumber] ? null : quiz[questionNumber].question}</h2>
            <button>ANSWER</button>
        </form>
        <BackButton />
    </>)

}

export default Quiz;