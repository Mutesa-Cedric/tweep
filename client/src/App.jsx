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
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./hooks/useDarkMode";
import { DataProvider } from "./hooks/useData";
import { PostProvider } from './hooks/usePost';
import { RecoilRoot } from 'recoil';

function App() {
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
      <AuthProvider>
        <DataProvider>
          <ThemeProvider>
            <PostProvider>
              <RecoilRoot>
                <div>
                  <Routes>
                    <Route path='/auth/login' exact element={<Login />} />
                    <Route path='/auth/signup' exact element={<SignupMain />} />
                    <Route path='/bookmarks' exact element={<Bookmarks />} />
                    <Route path='/explore' exact element={<Explore />} />
                    <Route path='/' exact element={<Home fixSide={fixSide} />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/profile/' element={<Profile fixSideSearch={fixSideSearch} />} />
                    <Route path={'/simple'} element={<SimpleSnackbar />} />
                    <Route path='/currentProfile' element={<CurrentProfile />} />
                    <Route path={'/verifyEmail'} element={<VerifyAccount />} />
                  </Routes>
                </div>
              </RecoilRoot>
            </PostProvider>
          </ThemeProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
