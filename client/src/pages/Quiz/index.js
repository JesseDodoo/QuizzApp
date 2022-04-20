import React, { useState } from 'react';
import { BackButton } from '../../components'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate as Navigate } from 'react-router-dom';

function Quiz() {
    const goTo = Navigate();
    const players = useSelector(state => state.players);
    const quiz = useSelector(state => state.quiz);
    const [playerNumber, setPlayerNumber] = useState(Math.floor(Math.random() * players.length));
    const [playerToAnswer, setPlayerToAnswer] = useState(players[playerNumber].playerName);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionAnswers, setQuestionAnswers] = useState();
    //console.log("player to answer", playerToAnswer);
    //console.log('playerNumber', playerNumber)
    //console.log('the players', players);
    //console.log('quiz value', quiz)
    //console.log('questionAnswers', questionAnswers)


    function questionChoice(questionNumber) {
        let choiceArray = [];
        if(quiz[questionNumber] === undefined){
            console.log("oh no im  undefined")
        }
        else{
            if (quiz[questionNumber].type === 'multiple') {
                choiceArray.push(quiz[questionNumber].correct_answer);
                for (let i = 0; i < quiz[questionNumber].incorrect_answers.length; i++) {
                    choiceArray.push(quiz[questionNumber].incorrect_answers[i]);
                }
                choiceArray.sort(() => Math.random() - 0.5);
                //console.log('choice array in questionChoice', choiceArray)
                setQuestionAnswers(choiceArray);
            }
            else{
                choiceArray = ['true', 'false']
                setQuestionAnswers(choiceArray);

            }

        }
        
    }

    function renderAnswers(){
        if(questionAnswers === undefined){
            questionChoice(questionNumber);
        }
        else{
            return questionAnswers.map(answer => <h2>{answer}</h2>)
        }
  

    }



    function onSubmitAnswer(e) {
        setQuestionNumber(questionNumber+1)
        e.preventDefault();
        //console.log("you clicked the button");
        //console.log("question number", questionNumber)
        questionChoice(questionNumber+1);
        if (playerNumber >= (players.length - 1)) {
            setPlayerNumber(0);
            setPlayerToAnswer(players[0].playerName);

        }
        else {
            setPlayerNumber(playerNumber + 1);
            setPlayerToAnswer(players[playerNumber + 1].playerName);

        }
        if (quiz[questionNumber] === quiz[quiz.length - 1]) {
            goTo('/quiz/results');
        }
    }

    return (<>
        <h1>Quiz page</h1>
        <h2>{playerToAnswer}</h2>
        <form onSubmit={onSubmitAnswer}>
            <h2>question:{!quiz[questionNumber] ? null : quiz[questionNumber].question}</h2>
            <h1>{!quiz[questionNumber] ? "hello" : renderAnswers()}</h1>
            <button>ANSWER</button>
        </form>
        <BackButton />
    </>)

}

export default Quiz;