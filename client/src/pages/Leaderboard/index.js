import React from 'react';
import { BackButton, Scores, Pagination, TopScore} from '../../components'
import { useState, useEffect} from 'react'
import axios from 'axios';
import './styles.css'


function Leaderboard() {

    const conStr = 'http://localhost:3000/scores';

    const [scoresList,setScoresList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [scoresPerPage,setScoresPerPage] = useState(6);

    useEffect(() => 
    {
      
        const fetchScores = async () => 
        {
            try{

                //First rank will be 1
                let rank = 1;

                //Set loading status to true - we've started loading scores
                setLoading(true);

                //get the scores
                const resp = await axios.get(conStr);

                //Sort and add ranking
                let scoreArray = resp.data.sort((a,b) => parseInt(b.score) - parseInt(a.score));
                let rankedArray = scoreArray.map(score => ({...score, rank: rank++}) )

                //Set state
                setScoresList(rankedArray);

                //We're done loading - set to false.
                setLoading(false);
            }
            catch (err)
            {
                console.log(err);
            }
        }
        //Run fetchScores on page load.
        fetchScores();
    }, [])
    

    //Get current posts
    const indexOfLastScore = currentPage * scoresPerPage;
    const indexOfFirstScore = indexOfLastScore - scoresPerPage;
    const currentScores = scoresList.slice(indexOfFirstScore, indexOfLastScore)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const clickPrev = () => {
        if (currentPage > 1)
        {
            setCurrentPage(currentPage -1);
        }
    }

    const clickNext = () => {
        if (currentPage < Math.ceil(scoresList.length/scoresPerPage))
        {
            setCurrentPage(currentPage +1);
        }
    }

    function changeScoresPerPage ()
    {
        const list = document.getElementById("ScoresPerPage")
        setScoresPerPage(parseInt(list.value)+1)
        setCurrentPage(1);
    }

    return (
        <section className='ScoreSection container'>
            <h1 className="header title">Leaderboard</h1>

            {/* Output to generate scores */}


            {scoresList.length > 0? (<TopScore key = {scoresList[0].id} score={scoresList[0]} rank={scoresList[0].rank} />) : 'No top score found'}

            <div className="OtherWinners">
                <h3 className='header title'>WINNERS</h3>
            </div>

             {/* Select how many to show on page select */}
             <div className = "ShowPerPageContainer">
                <section id="ShowPerPageSection" className = "ShowPerPageSection">
                    <label htmlFor="ScoresPerPage" className="NoToShowPerPage">scores per page:</label>

                    <select name = 'ScoresPerPage' id = 'ScoresPerPage' style={{}}>
                        <option value = "5" defaultValue>5</option>
                        <option value = "10">10</option>
                        <option value = "25">25</option>
                        <option value = "50">50</option>
                        <option value = "100">100</option>
                    </select>

                    <button onClick={changeScoresPerPage} className = "RefreshBtn">Refresh</button>
                </section>
            </div>

            <br/>


            {/* Pagination buttons */}
            <section className='PaginationSection'>
                { currentPage > 1 ? (<button onClick = {clickPrev} className="PaginationButton" >Prev</button>) : ''}
                <Pagination scoresPerPage={scoresPerPage} totalScores={scoresList.length} paginate={paginate} />
                { currentPage < Math.ceil(scoresList.length/scoresPerPage) ? (<button  onClick = {clickNext} className="PaginationButton">Next</button>) : ''}
            </section>

            {scoresList.length > 0 ? (<Scores scores = {currentScores} loading={loading} />) : 'No scores found' }  

            <section className='BackBtnSection'>
                <BackButton />
            </section>

        </section>
    )

}

export default Leaderboard;