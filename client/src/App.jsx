import './App.css';
import Login from './pages/login/Login';
import SignupMain from './pages/signup/Main';
import Home from './pages/Home/Home';
import Explore from "./pages/explore/Explore";
import Bookmarks from './pages/bookmarks/Bookmarks';
import Chat from './pages/chat/Main';
import Profile from "./pages/profile/Profile"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CurrentProfile from "./pages/profile/currentProfile";
import SimpleSnackbar from "./components/ProcessSuccessful";
import VerifyAccount from "./components/emailVerification";
function App() {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      return !prevMode
    });
  }
  const [fixSide, setFixSide] = useState(false)
  const [fixSideSearch, setFixSideSearch] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {

      // fixing who to follow
      if (window.scrollY > 510) {
        setFixSide(true)
      } else {
        setFixSide(false)
      }

      //  fixing side nav

      if (window.scrollY > 50) {
        setFixSideSearch(true)
      } else {
        setFixSideSearch(false)
      }
    })
  })

  //file handling


  return (
    <Router>
      <div>
        <Routes>
          <Route path='/auth/login' exact element={<Login darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
          <Route path='/auth/signup' exact element={<SignupMain darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
          <Route path='/bookmarks' exact element={<Bookmarks darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
          <Route path='/explore' exact element={<Explore darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
          <Route path='/' exact element={<Home darkMode={darkMode} setDarkMode={toggleDarkMode} fixSide={fixSide} />} />
          <Route path='/chat' element={<Chat darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
          <Route path='/profile/' element={<Profile darkMode={darkMode} setDarkMode={toggleDarkMode} fixSideSearch={fixSideSearch} />} />
          <Route path={'/simple'} element={<SimpleSnackbar />} />
          <Route path='/currentProfile' element={<CurrentProfile darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
          <Route path={'/verifyEmail'} element={<VerifyAccount darkMode={darkMode} setDarkMode={toggleDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
