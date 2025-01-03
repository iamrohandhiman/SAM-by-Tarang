import React from 'react'
import ReactDOM from "react-dom/client";
import { AreaSelection } from './pages/AreaSelection'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from './components/common/Navbar';
import MapComponent from './components/specific/MapComponent.jsx';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes> 
      <Route path="/user/select/area/map" element={  <MapComponent/>}/>
      <Route path="/user/select/area" element={<AreaSelection />}/>
     </Routes>
    </BrowserRouter>
  

  )
}

export default App