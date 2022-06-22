import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game } from "./Pages/Game/Game";
import Home from "./Pages/Home";
import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
