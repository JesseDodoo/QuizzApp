import React from 'react';
import { NavLink } from 'react-router-dom';

function Home (){
    return(<>
    <h1>Home page</h1>
    <NavLink to="setup"><h1>PLAY</h1></NavLink>
    <h1>JOIN BY ROOM ID</h1>
    <NavLink to="about"><h1>ABOUT</h1></NavLink>
    <NavLink to="leaderboard"><h1>LEADERBOARD</h1></NavLink>
    </>)

}

export default Home;