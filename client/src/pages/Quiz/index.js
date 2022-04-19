import React, { useState } from 'react';
import { BackButton } from '../../components'
import { useSelector, useDispatch } from 'react-redux';

function Quiz() {

    const players = useSelector(state => state.players);
    let quiz = useSelector(state => state.quiz);
    const [playerNumber, setPlayerNumber] = useState(0);
    const [playerToAnswer, setPlayerToAnswer] = useState(players[playerNumber].playerName);
    console.log("player to answer", playerToAnswer);
    console.log('playerNumber', playerNumber)
    console.log('the players', players);
    console.log('the quiz', quiz)

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
        }
        else {
            setPlayerNumber(playerNumber + 1);
            setPlayerToAnswer(players[playerNumber + 1].playerName);

        }



    }

    return (<>
        <h1>Quiz page</h1>
        <h2>{playerToAnswer}</h2>
        <form onSubmit={onSubmitAnswer}>
            <button>ANSWER</button>
        </form>
        <BackButton />
    </>)

}

export default Quiz;