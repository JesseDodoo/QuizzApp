import React, { useState, useEffect } from "react";
import { BackButton } from "../../components";
import { useNavigate as Navigate } from "react-router-dom";
import { getPlayers, getQuiz } from "../../actions";
import { useDispatch } from "react-redux";
import "./styles.css";

function Setup() {
  const goTo = Navigate();
  const [playerNumber, setPlayerNumber] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(10);
  const [playerName, setPlayerName] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [triviaType, setTriviaType] = useState("");
  const [mainPlayer, setMainPlayer] = useState("");

  useEffect(() => {
    let playerExists = getCookie("userId");
    if (playerExists) {
      fetchUser(playerExists);
      setPlayerNumber(1);
    }
  }, []);
  const dispatch = useDispatch();

  async function fetchUser(id) {
    const response = await fetch(`http://localhost:3000/scores/${id}`);
    let { username } = await response.json();
    setMainPlayer(username);
    let playerArray = [];
    playerArray.push({ playerName: username, score: 0 });
    setPlayerName(playerArray);
    dispatch({
      type: "SET_MAIN",
      payload: { playerName: username, id: id },
    });
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  playerName.length = playerNumber;
  console.log("mainPlayer", mainPlayer);
  console.log("category value", category);
  console.log("number of questions", questionNumber);
  console.log("difficulty", difficulty);
  console.log("type", triviaType);
  console.log(" ");

  function playerCount(e) {
    setPlayerNumber(parseInt(e.target.value));
  }

  playerName.length = playerNumber;
  console.log("playerName", playerName);
  console.log("category value", category);
  console.log("number of questions", questionNumber);
  console.log("difficulty", difficulty);
  console.log("type", triviaType);
  console.log(" ");

  function playerCount(e) {
    setPlayerNumber(parseInt(e.target.value));
  }

  function renderPlayerInput() {
    let inputAreas = [];
    for (let i = 0; i < playerNumber; i++) {
      if (i == 0 && mainPlayer) {
        inputAreas.push(
          <input
            required
            type="text"
            className="nameInput"
            value={mainPlayer}
            key={i}
            onChange={getPlayerName}
            placeholder="enter player name"
          ></input>
        );
      } else {
        inputAreas.push(
          <input
            required
            type="text"
            className="nameInput"
            key={i}
            onChange={getPlayerName}
            placeholder="enter player name"
          ></input>
        );
      }
    }
    return inputAreas;
  }

  function getPlayerName() {
    let allPlayers = [];
    let playerNameInput = document.getElementsByClassName("nameInput");
    for (let i = 0; i < playerNumber; i++) {
      allPlayers[i] = { playerName: playerNameInput[i].value, score: 0 };
    }
    setPlayerName(allPlayers);
  }

  function getCategory(e) {
    setCategory(e.target.value);
  }

  function getDifficulty(e) {
    setDifficulty(e.target.value);
  }

  function getTriviaType(e) {
    setTriviaType(e.target.value);
  }

  function questionCount(e) {
    if (playerNumber !== 0) {
      if (e.target.value % playerNumber !== 0) {
        console.log(`must be a multiple of ${playerNumber}`);
      } else {
        setQuestionNumber(parseInt(e.target.value));
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(getQuiz(questionNumber, category, difficulty, triviaType));
    dispatch(getPlayers(playerName));
    if (!mainPlayer) {
      try {
        let response = await fetch(`http://localhost:3000/scores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: playerName[0].playerName }),
        });
        let { id, username } = await response.json();
        setMainPlayer(username);
        dispatch({
          type: "SET_MAIN",
          payload: { playerName: username, id: id },
        });
        document.cookie = `userId=${id}; expires=Thu, 18 Dec 2050 12:00:00 UTC`;
      } catch (err) {
        console.log(err);
      }
    }
    goTo("/quiz");
  }

  return (
    <>
      <h1>Setup page</h1>
      <form onSubmit={handleSubmit}>
        <label>Local or online?</label>

        <select required name="onlineOrLocal">
          <option value="">please select</option>
          <option value="online">Online</option>
          <option value="local">Local</option>
        </select>
        <label>How many players?</label>
        <select required onChange={playerCount} name="numberOfPlayers">
          <option value="">please select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <div className="inputContainer">
          {!playerNumber ? null : renderPlayerInput()}
        </div>

        <label>Category</label>
        <select onChange={getCategory} name="trivia_category">
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
        <select onChange={getDifficulty} name="trivia_difficulty">
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select onChange={getTriviaType} name="trivia_type">
          &gt;
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
        <input
          required
          onChange={questionCount}
          placeholder="Number of Questions"
          type="number"
        ></input>
        <button type="submit">PLAY</button>
      </form>

      <BackButton />
    </>
  );
}

export default Setup;
