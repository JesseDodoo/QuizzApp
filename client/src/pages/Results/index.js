import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate as Navigate } from 'react-router-dom';
import { emptyQuiz } from '../../actions';


function Results (){
    const dispatch = useDispatch();

    function emptyTheQuiz(){
        dispatch(emptyQuiz())
        
    }





    return(<>
    <h1>Results page</h1>
    <h1>PLAY AGAIN?</h1>
    <NavLink onClick = {emptyTheQuiz} to="/setup"><h1>YES</h1></NavLink>
    <NavLink onClick = {emptyTheQuiz} to="/"><h1>NO</h1></NavLink>
    </>)

}

export default Results;