import React from 'react';
import { BackButton, Scores} from '../../components'
import { useState, useEffect} from 'react'
import axios from 'axios';


function Leaderboard() {

    const conStr = 'http://localhost:3000/scores';

    const [scoresList,setScoresList] = useState([]);
  
    const getScoreList = async () => 
    {
        try
        {
            const resp = await axios.get(conStr);
            console.log("scores: " +resp.data)
            setScoresList(resp.data);
        }
        catch (err)
        {
            console.log("couldn't get scores" + err);
        }
    }
    
    console.log(scoresList)


    return (
    <>
        <h1>Leaderboard page</h1>
        <BackButton />

        <button onClick = {getScoreList}> load</button>

        {scoresList.length > 0 ? (<Scores scores = {scoresList} />) : 'No scores found' }      

    </>)

}

export default Leaderboard;