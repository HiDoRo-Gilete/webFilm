import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditFilm from "./pages/EditFilm";
import AddFilm from "./pages/AddFilm";

import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/edit_film" element={<EditFilm/>}/>
        <Route path="/add_film" element={<AddFilm/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App
