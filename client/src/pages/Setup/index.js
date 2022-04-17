import React, { useState } from 'react';
import { BackButton } from '../../components'


function Setup() {

    const [playerNumber, setPlayerNumber] = useState(0);
    console.log("playerNumber", playerNumber)



    function playerCount(e){
        console.log(e.target.value)
        setPlayerNumber(parseInt(e.target.value));
    }

    function renderPlayerInput(){
        let inputAreas = [];
        for(let i = 0; i < playerNumber; i++){
            inputAreas.push(<input type='text' key={i} placeholder="enter player name..."></input>)
        }
        return inputAreas;
    }


    return (<>
        <h1>Setup page</h1>
        <form>
            <label>How many players?</label>
            <select onChange={playerCount}name="numberOfPlayers">
                <option value="">please select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            {!playerNumber ? null : renderPlayerInput()}

        </form>

        <BackButton />
    </>)

}

export default Setup;