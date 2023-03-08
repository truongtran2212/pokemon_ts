import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import PokemonList from "./component/character/PokemonList";
import Location from "./component/location/Location";
import PokemonList2 from "./component/character/PokemonList2";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/location" element={<Location />} />
        <Route path="/listPoke" element={<PokemonList2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
