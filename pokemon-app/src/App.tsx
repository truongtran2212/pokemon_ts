import { LoadingOutlined } from "@ant-design/icons";
import React, { Suspense } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import Location from "./component/location/Location";
import History from "./component/location/History";

const PokemonList = React.lazy(() => import("./component/team/character/PokemonList"));
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{display: "flex"}}><LoadingOutlined className="loading" style={{fontSize: 100}}/></div>}>
        <Routes>
          <Route path="/history" element={<History />} />
          <Route path="/location" element={<Location />} />
          <Route path="/" element={<PokemonList />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
