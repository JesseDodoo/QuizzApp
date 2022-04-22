import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../contexts/SocketProvider";

export default function LobbyEntry() {
  const [player, setPlayer] = useState();
  const [room, setRoom] = useState();
  const goto = useNavigate();

  const dispatch = useDispatch();
  const socket = useSocket();
  const [playerExists, setPlayerExists] = useState(false);
  useEffect(() => {
    let playerInfo = getCookie("userId");
    if (playerInfo) {
      fetchUser(playerInfo);
    }
  }, []);
  async function fetchUser(id) {
    const response = await fetch(`http://localhost:3000/scores/${id}`);
    let { username } = await response.json();
    setPlayer(username);
    setPlayerExists(true);
    // dispatch({
    //   type: "SET_MAIN",
    //   payload: { playerName: username, id: id },
    // });
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (playerExists == false) {
      try {
        let response = await fetch(`http://localhost:3000/scores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: player }),
        });
        let { id, username } = await response.json();
        dispatch({
          type: "SET_MAIN",
          payload: { playerName: username, id: id },
        });
        document.cookie = `userId=${id}; expires=Thu, 18 Dec 2050 12:00:00 UTC`;
      } catch (err) {
        console.log(err);
      }
    }
    dispatch({
      type: "SET_MAIN",
      payload: { playerName: player },
    });
    goto(`../lobby/${room}`);
  }

  function handlePlayerChange(e) {
    if (playerExists) {
      return;
    }
    setPlayer(e.target.value);
  }
  function handleRoomChange(e) {
    setRoom(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handlePlayerChange}
        placeholder="Name"
        value={player}
      />
      <input
        type="text"
        onChange={handleRoomChange}
        value={room}
        placeholder="Room ID"
      />

      <input type="submit" name="" id="" />
    </form>
  );
}
