import axios from 'axios';


export const getPlayers =(playerArray) => ({type: 'LOADING_PLAYERS', payload: playerArray})

const getQuizInfo = (quiz) => ({ type: 'LOADING_QUIZ', payload: quiz });

const loading = () => ({type: 'LOADING_QUIZ'})

export const updateScore = (playerName, score) => ({type: 'SET_SCORE', payload: {playerName, score}})

export const emptyQuiz = () => ({type: 'EMPTY_QUIZ'})

export const getQuiz = (questionNumber, category, difficulty, type) => {
    console.log('all variables going to getQuiz', questionNumber, category, difficulty, type)
    return async dispatch => {
        try{
            dispatch(loading)
            if(questionNumber && category && difficulty && type){
                const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&category=${category}&difficulty=${difficulty}&type=${type}`);
                console.log("response of fetch here", data)
                await dispatch(getQuizInfo(data.results));
            }
            else if(!category && difficulty && type){
                const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&difficulty=${difficulty}&type=${type}`);
                console.log("response of fetch here", data)
                await dispatch(getQuizInfo(data.results));
            }
            else if(category && !difficulty && type){
                const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&category=${category}&type=${type}`);
                console.log("response of fetch here", data)
                await dispatch(getQuizInfo(data.results));
            }
            else if(category && difficulty && !type){
                const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&difficulty=${difficulty}&category=${category}`);
                console.log("response of fetch here", data)
                await dispatch(getQuizInfo(data.results));
            }
            else if(category && !difficulty && !type){
                const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&category=${category}`);
                console.log("response of fetch here", data)
                await dispatch(getQuizInfo(data.results));
            }
            else if(!category && difficulty && !type){
                const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&difficulty=${difficulty}`);
                console.log("response of fetch here", data)
                await dispatch(getQuizInfo(data.results));
            }
            else if(!category && !difficulty && type){
                const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&type=${type}`);
                console.log("response of fetch here", data)
                await dispatch(getQuizInfo(data.results));
            }
            else{
                const { data }  = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}`);
                console.log("response of fetch here", data)
                await dispatch(getQuizInfo(data.results));
            }



        }
        catch(err){
            console.log(err)
            dispatch({ type: 'SET_ERROR', payload: err.message })

        }
    }
}