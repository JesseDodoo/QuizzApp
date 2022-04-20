import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

function Home (){
    return(
    <>
    <h1 className='header'>Quizz App</h1>
    <h4 className="logo">Logo Here</h4>
    <main>
    <NavLink to="setup" className='link'><h1>PLAY</h1></NavLink>
    {/* <h1 className='link'>JOIN BY ROOM ID</h1> */}
    <NavLink to="about" className='link'><h1>ABOUT</h1></NavLink>
    <NavLink to="leaderboard" className='link'><h1>LEADERBOARD</h1></NavLink>
    </main>
    </>)

}

export default Home;
