import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Explore from "./pages/Explore";
import Bookmarks from './pages/Bookmarks';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React,{useState,useEffect} from 'react';

function App() {

  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode=()=>{
    setDarkMode(prevMode=>{
      return !prevMode
    });
  }
    return (
      <Router>
        <div>
          <Routes>
            <Route path='/auth/login' exact element={<Login darkMode={darkMode} setDarkMode={toggleDarkMode}/>} />
            <Route path='/auth/signup' exact element={<Signup darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
            <Route path='/bookmarks' exact element={<Bookmarks/>}/>
            <Route path='/explore' exact element={<Explore/>}/>
            <Route path='/' exact element={<Home/>}/>
          </Routes>  
        </div>
      </Router>  
    );
}

export default App;
