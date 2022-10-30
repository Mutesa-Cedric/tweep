import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "../../axios.config"


const AuthContext = createContext({
    user: null,
    login: (email, password) => { },
    signup: (username, email, password) => { },
    logout: () => { },
    error: null,
    loading: null,
});


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    /** this is a login function which receives email and password of the user */
    async function login(email, password) {
        setLoading(true)
        await axios.post('/login', {
            email: email,
            password: password
        }).then(({ data }) => {
            if (data.loggedIn) {
                window.localStorage.setItem("accessToken", data.accessToken);
                navigate('/');
            } else {
                setError(data.message);
            }
        })
            .catch(err => {
                setError(err.message)
            })
            .finally(setLoading(false))
    }

    // signup function
    async function signup(username, email, password) {
        setLoading(true);
        await axios.post('/register', {
            userName: username,
            email: email,
            password: password
        }).then(({ data }) => {
            console.log(data)
        })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }

    // logout function
    async function logout() {
        setLoading(true);
        window.localStorage.removeItem('accessToken')
        navigate('/auth/login')
    }

    async function getProfile(username) {
        setLoading(true);
        await axios.get(`/profiles/${username}`)
            .then(({ data }) => {
                setUser(data.profile)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }
    // getProfile function


    useEffect(() => {
        setLoading(true);
        const accessToken = window.localStorage.getItem("accessToken");

        if (pathname === "/auth/signup" || pathname === "/auth/login") {
            setLoading(false);
        } else {
            if (accessToken) {
                axios.get(`/auth/verifyToken/${accessToken}`)
                    .then(({ data }) => {
                        if (data.authorized && data.user.verified) {
                            getProfile(data.user.userName)
                        }
                        else if (data.authorized && !data.user.verified) {
                            navigate('/verifyEmail')
                        }
                        else { navigate('/auth/login') }
                    })
                    .catch(err => {
                        setError(err.message);
                    })
                    .finally(() => setLoading(false))
            } else { navigate("/auth/signup") }
        }

        setLoading(false);
    }, []);
    const memoedValue = useMemo(() => ({
        user, login, signup, error, loading, logout
    }), [loading, login, signup, error, user])
    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}


export default function useAuth() {
    return useContext(AuthContext);
}