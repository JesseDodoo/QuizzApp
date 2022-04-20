import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { emptyQuiz } from '../../actions';


function Results (){
    const dispatch = useDispatch();

    const players = useSelector(state => state.players);

    function renderScores(){
        const displayArray = [];
        players.sort((a, b) => (a.score > b.score ? -1 : 1))
        const winner = players[0];
        displayArray.push(<h1>WINNNNNER: {winner.playerName}, score: {winner.score}</h1>)
        for (let i = 1; i < players.length; i++){
            displayArray.push(<h2> {i+1} place: {players[i].playerName}, score: {players[i].score}</h2>)
        }

        return displayArray;
    }


    function emptyTheQuiz(){
        dispatch(emptyQuiz())
        
    }







    return(<>
    <h1>Results page</h1>
    {renderScores()}
    <h1>PLAY AGAIN?</h1>
    <NavLink onClick = {emptyTheQuiz} to="/setup"><h1>YES</h1></NavLink>
    <NavLink onClick = {emptyTheQuiz} to="/"><h1>NO</h1></NavLink>
    </>)

}

export default Results;