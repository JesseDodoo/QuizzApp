import axios from 'axios';


export const getPlayers =(playerArray) => ({type: 'LOADING_PLAYERS', payload: playerArray})

const getQuizInfo = (quiz) => ({ type: 'LOADING_QUIZ', payload: quiz });

export const updateScore = (playerName, score) => ({type: 'SET_SCORE', payload: {playerName, score}})

export const getQuiz = (questionNumber, category, difficulty, type) => {
    console.log('all variables going to getQuiz', questionNumber, category, difficulty, type)
    return async dispatch => {
        try{
            const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&category=${category}&difficulty=${difficulty}&type=${type}`);
            console.log("response of fetch here", data)
            await dispatch(getQuizInfo(data.results));

        }
        catch(err){
            console.log(err)

        }
    }
}