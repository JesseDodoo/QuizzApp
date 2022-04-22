import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSocket } from "../../contexts/SocketProvider";

import "./index.css";

export default function Lobby() {
  const [playerList, setPlayerList] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const socket = useSocket();
  const player = useSelector((state) => state.mainPlayer);
  const quizData = useSelector((state) => state.quizData);

  console.log("player:", player);
  useEffect(() => {
    socket.emit("joinRoom", player[0].playerName, id, quizData, (list) => {
      setPlayerList(list.players);
      dispatch({ type: "SET_DATA", payload: list.quizData });
    });
  }, []);

  socket.on("joined", (roomList) => {
    console.log("Joined", roomList);
    setPlayerList(roomList.players);
  });

  function renderPlayers() {
    let players = [];
    for (let p of playerList) {
      players.push(<h2>{p}</h2>);
    }
    return players;
  }
  return (
    <>
      <h1>Waiting Room: Room {id}</h1>

      <section className="lobbyDetails">
        <div className="gameInfo">
          <h2>
            Playercount:{playerList.length}/{quizData.playerNumber}
          </h2>
          <h2>Question count: {quizData.questionNumber}</h2>
          <h2>Category: {quizData.category}</h2>
          <h2>Question Type: {quizData.triviaType}</h2>
          <h2>Difficulty: {quizData.difficulty}</h2>
        </div>

        <div className="players">
          <h2 className="listTitle">Player List:</h2>
          <ul>{playerList && renderPlayers()}</ul>
        </div>

        <button
          disabled={playerList.length == quizData.playerNumber ? false : true}
          className="submit"
        >
          start quiz
        </button>
      </section>
    </>
  );
}
