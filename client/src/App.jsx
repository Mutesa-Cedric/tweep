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
import MainLayout from './components/MainLayout';


function App() {
  const [fixSide, setFixSide] = useState(false)
  const [fixSideSearch, setFixSideSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // fixing who to follow
      window.scrollY > 510 ? setFixSide(true) : setFixSide(false)
      //  fixing side nav
      window.scrollY > 50 ? setFixSideSearch(true) : setFixSideSearch(false)
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  })

  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <ThemeProvider>
            <PostProvider>
              <RecoilRoot>
                <div>
                  <Routes>
                    <Route path={'/verifyEmail'} element={<VerifyAccount />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/auth/login' exact element={<Login />} />
                    <Route path='/auth/signup' exact element={<SignupMain />} />
                  </Routes>
                  <MainLayout>
                    <Routes>
                      <Route path='/bookmarks' exact element={<Bookmarks />} />
                      <Route path='/explore' exact element={<Explore />} />
                      <Route path='/' exact element={<Home fixSide={fixSide} />} />
                      <Route path='/profile/' element={<Profile fixSideSearch={fixSideSearch} />} />
                      <Route path='/currentProfile' element={<CurrentProfile />} />
                    </Routes>
                  </MainLayout>
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
