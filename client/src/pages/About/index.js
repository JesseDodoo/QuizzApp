import React from 'react';
import {BackButton} from '../../components'
import './styles.css'

function About (){
    return(
    <section className='AboutWrapper'>
    
        <h1 className='header title'>About</h1>
        <br/>


        <h3 className='header title'>How to play</h3>
        <section className='HowToPlaySection'>

            <ul>
                <li className='ScoreItem'>
                    Click Back to go back to the home page
                </li>
                <br/>
                <li className='ScoreItem'>
                    Click Play to start setting up your game!
                </li>
                <br/>
                <li className='ScoreItem'>
                    Select your options as desired.
                </li>
                <br/>
                <li className='ScoreItem'>
                    Finally, click play to begin!
                </li>
                <br/>
                <li className='ScoreItem'>
                    Good luck :D
                </li>
            </ul>

        </section>

        <h3 className='header title'>Other info</h3>
        <section className='HowToPlaySection'>

            <p className='ScoreItem'>App created by Rakib Ali, Harry Moore, Jesse Dodoo and Zeia Gillies</p>

        </section>

        <BackButton />
    </section>
    )

}

export default About;