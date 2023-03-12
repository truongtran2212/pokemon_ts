import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import Location from "./component/location/Location";
import ChoosePlayer1 from "./component/team/character/ChoosePlayer1";
import ChoosePlayer2 from "./component/team/character/ChoosePlayer2";
import PokemonList from "./component/team/character/PokemonList";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/location" element={<Location />} />
        <Route path="/" element={<PokemonList />} />
        <Route path="/choosePlayer1" element={<ChoosePlayer1 />} />
        <Route path="/choosePlayer2" element={<ChoosePlayer2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
