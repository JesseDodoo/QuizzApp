import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { emptyQuiz } from "../../actions";

function Results() {
  const dispatch = useDispatch();

  const players = useSelector((state) => state.players);
  const quiz = useSelector((state) => state.quiz);
  const mainPlayer = useSelector((state) => state.mainPlayer);
  const [newScore, setNewScore] = useState("");
  useEffect(() => {
    const player = players.find(
      (p) => p.playerName == mainPlayer[0].playerName
    );
    fetchScore(mainPlayer[0].id, player.score);
  }, []);

  async function fetchScore(id, scoreIncrementor) {
    const response = await fetch(`http://localhost:3000/scores`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        score: scoreIncrementor,
      }),
    });
    let resp = await response.json();
    setNewScore(resp.score);
  }

  function renderScores() {
    const displayArray = [];
    const maxScore = quiz.length * 5;
    players.sort((a, b) => (a.score > b.score ? -1 : 1));
    const winner = players[0];
    displayArray.push(
      <h1>
        WINNNNNER: {winner.playerName}, scored: {winner.score} out of{" "}
        {maxScore / players.length}, correct answers: {winner.score / 5}/
        {maxScore / 5 / players.length}
      </h1>
    );
    for (let i = 1; i < players.length; i++) {
      displayArray.push(
        <h2>
          {" "}
          {i + 1} place: {players[i].playerName}, scored: {players[i].score} out
          of {maxScore / players.length}, correct answers:{" "}
          {players[i].score / 5}/{maxScore / 5 / players.length}
        </h2>
      );
    }

    return displayArray;
  }

  function emptyTheQuiz() {
    dispatch(emptyQuiz());
  }

  return (
    <>
      <h1>Results page</h1>
      <h1>
        {mainPlayer.playerName} Overall Score is now: {newScore} points!
      </h1>
      {renderScores()}
      <h1>PLAY AGAIN?</h1>
      <NavLink onClick={emptyTheQuiz} to="/setup">
        <h1>YES</h1>
      </NavLink>
      <NavLink onClick={emptyTheQuiz} to="/">
        <h1>NO</h1>
      </NavLink>
    </>
  );
}

export default Results;
