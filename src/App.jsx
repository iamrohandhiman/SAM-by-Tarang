import React from 'react'
import ReactDOM from "react-dom/client";
import { AreaSelection } from './pages/AreaSelection'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from './components/common/Navbar';
import MapComponent from './components/specific/MapComponent.jsx';
import { PlaningPage } from './pages/PlaningPage.jsx';
import { FabricCanvas } from './components/layout/FabricMap.jsx';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <FabricCanvas/>
      <Routes> 
      <Route path="/user/select/area" element={<AreaSelection />}/>
      <Route path="/user/select/area/user/area/plan" element={<PlaningPage/>}/>
     </Routes>
    </BrowserRouter>
  

  )
}

export default App