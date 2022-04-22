import React, { useEffect } from "react";
import {
  About,
  Home,
  Leaderboard,
  Quiz,
  Results,
  Setup,
  NotFound,
  LobbyEntry,
  Lobby,
} from "./pages/index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="setup" element={<Setup />} />
        <Route path="lobby" element={<LobbyEntry />} />

        <Route path="lobby/:id" element={<Lobby />} />

        <Route path="quiz" element={<Quiz />} />
        <Route path="quiz/results" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
