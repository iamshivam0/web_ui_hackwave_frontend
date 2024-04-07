import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./page/Hero";
import Pwrgen from "./page/Pwrgen";
import Stability from "./page/Stability";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Pwrgen" element={<Pwrgen />} />
        <Route path="/Stability" element={<Stability />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
