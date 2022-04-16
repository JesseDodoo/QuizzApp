import React from 'react';
import { NavLink } from 'react-router-dom';


function Results (){
    return(<>
    <h1>Results page</h1>
    <h1>PLAY AGAIN?</h1>
    <NavLink to="/setup"><h1>YES</h1></NavLink>
    <NavLink to="/"><h1>NO</h1></NavLink>
    </>)

}

export default Results;