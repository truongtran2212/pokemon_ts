import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import PokemonList from "./component/character/PokemonList";
import Location from "./component/location/Location";
import ChoosePlayer1 from "./component/character/ChoosePlayer1";
import ChoosePlayer2 from "./component/character/ChoosePlayer2";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Location />} />
        <Route path="/choosePlayer1" element={<ChoosePlayer1 />} />
        <Route path="/choosePlayer2" element={<ChoosePlayer2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
