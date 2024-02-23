import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Planets from './Pages/Planet/Planets';
import IndividualPlanet from './Pages/IndividualPlanet/IndividualPlanet';
import ResidentPage from './Pages/ResidentPage/ResidentPage';
import './App.css'
import UpperHeading from './Components/UpperHeading';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <UpperHeading/>
        <Routes>
          <Route path="/" element={<Planets />} />
          <Route path="/planet/:id" element={<IndividualPlanet />} />
          <Route path="/person/:id" element={<ResidentPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
