import './App.css';
import Login from './pages/Login';
import SignupMain from './pages/signup/Main';
import Home from './pages/Home';
import Explore from "./pages/Explore";
import Bookmarks from './pages/Bookmarks';
import Chat from './pages/Chat';
import Profile from "./pages/Profile"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React,{useState} from 'react';

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
            <Route path='/auth/signup' exact element={<SignupMain darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
            <Route path='/bookmarks' exact element={<Bookmarks/>}/>
            <Route path='/explore' exact element={<Explore/>}/>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/chat' element={<Chat/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>  
        </div>
      </Router>  
    );
}

export default App;
