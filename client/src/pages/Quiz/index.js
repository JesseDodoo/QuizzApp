import React, { useState } from 'react';
import { BackButton } from '../../components'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate as Navigate } from 'react-router-dom';
import { updateScore } from '../../actions';



function Quiz() {
    const dispatch = useDispatch();
    const goTo = Navigate();
    const players = useSelector(state => state.players);
    const quiz = useSelector(state => state.quiz);
    const [playerNumber, setPlayerNumber] = useState(Math.floor(Math.random() * players.length));
    const [playerToAnswer, setPlayerToAnswer] = useState(players[playerNumber]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionAnswers, setQuestionAnswers] = useState();
    const [answerChosen, setAnswerChosen] = useState("")
    //console.log("player to answer", playerToAnswer);
    //console.log('playerNumber', playerNumber)
    //console.log('the players', players);
    //console.log('quiz value', quiz)
    //console.log('questionAnswers', questionAnswers)
    //console.log('answerChosen', answerChosen)


    function questionChoice(questionNumber) {
        let choiceArray = [];
        if(quiz[questionNumber] === undefined){
            console.log("oh no im  undefined")
        }
        else{
            if (quiz[questionNumber].type === 'multiple') {
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace('&',"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(&quot\;)/g,"\"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(&#039\;)/g,"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(#039\;)/g,"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(&shy\;)/g,"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(&Eacute\;)/g,"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(&ldquo\;)/g,"\"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(&rsquo\;)/g,"\'");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(&hellip\;)/g,"...");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(&rdquo\;)/g,"\"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(amp\;)/g,"&");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(acute\;)/g,"");
                quiz[questionNumber].correct_answer = quiz[questionNumber].correct_answer.replace(/(lrm\;)/g,"");
        
                choiceArray.push(quiz[questionNumber].correct_answer);
                for (let i = 0; i < quiz[questionNumber].incorrect_answers.length; i++) {
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&quot\;)/g,"\"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&#039\;)/g,"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(#039\;)/g,"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&shy\;)/g,"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&Eacute\;)/g,"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&ldquo\;)/g,"\"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&rsquo\;)/g,"\'");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&hellip\;)/g,"...");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&rdquo\;)/g,"\"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(acute\;)/g,"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace('&',"");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(amp\;)/g,"&");
                    quiz[questionNumber].incorrect_answers[i] = quiz[questionNumber].incorrect_answers[i].replace(/(&lrm\;)/g,"");
                    choiceArray.push(quiz[questionNumber].incorrect_answers[i]);
                }
                choiceArray.sort(() => Math.random() - 0.5);
                //console.log('choice array in questionChoice', choiceArray)
                setQuestionAnswers(choiceArray);
            }
            else{
                choiceArray = ['True', 'False']
                setQuestionAnswers(choiceArray);

            }

        }
        
    }

    function selectAnAnswer(e){
        setAnswerChosen(e.target.textContent);

    }

    function renderAnswers(){
        if(questionAnswers === undefined){
            questionChoice(questionNumber);
        }
        else{
            return questionAnswers.map(answer => <h2 key={Math.random() * players.length} onClick={selectAnAnswer}>{answer}</h2>)
        }
  

    }

    function renderQuestion(){
        let question = quiz[questionNumber].question.replace(/(&quot\;)/g,"\"");
        question = question.replace(/(&#039\;)/g,"");
        question = question.replace(/(&shy\;)/g,"");
        question = question.replace(/(&ldquo\;)/g,"\"");
        question = question.replace(/(&rsquo\;)/g,"\'");
        question = question.replace(/(&hellip\;)/g,"...");
        question = question.replace(/(&rdquo\;)/g,"\"");
        question = question.replace(/(amp\;)/g,"");
        question = question.replace(/(acute\;)/g,"");
        question = question.replace(/(&lrm\;)/g,"");

        return question;
        
    }



    function onSubmitAnswer(e) {
        e.preventDefault();
        let theUpdatedScore;
        setQuestionNumber(questionNumber+1)
        //console.log("you clicked the button");
        //console.log("question number", questionNumber)
        questionChoice(questionNumber+1);
        if (quiz[questionNumber] === quiz[quiz.length - 1]) {
            goTo('/quiz/results');
        }
        if(answerChosen === quiz[questionNumber].correct_answer){
            console.log(`${players[playerNumber].playerName} answered ${answerChosen} it was correct!`);
            theUpdatedScore = players[playerNumber].score;
            theUpdatedScore += 5;
            dispatch(updateScore(players[playerNumber].playerName, theUpdatedScore))
            if(players.length === 1){
                players[playerNumber].score = theUpdatedScore;
            }
            console.log("theUpdatedScore",theUpdatedScore)
            console.log("playerToAnswer.score",players[playerNumber].score)
            setAnswerChosen("");
        }
        else{
            console.log(`${players[playerNumber].playerName} answered ${answerChosen} it was incorrect!`);
            setAnswerChosen("");
            if(players.length === 1){
                players[playerNumber].score = players[playerNumber].score;
            }
        }
        if (playerNumber >= (players.length - 1)) {
            setPlayerNumber(0);
            setPlayerToAnswer(players[0]);


        }
        else {
            setPlayerNumber(playerNumber + 1);
            setPlayerToAnswer(players[playerNumber + 1]);

        }
    }

    return (<>
        <h1>Quiz page</h1>
        <h2>{!quiz[questionNumber] ? null : playerToAnswer.playerName}, score:{!quiz[questionNumber] ? null : playerToAnswer.score}</h2>
        <form onSubmit={onSubmitAnswer}>
            <h2>question:{!quiz[questionNumber] ? null : renderQuestion()}</h2>
            {!quiz[questionNumber] ? "hello" : renderAnswers()}
            <button>ANSWER</button>
        </form>
        <BackButton />
    </>)

}

export default Quiz;