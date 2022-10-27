import React, { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** this is a login function which receives email and password of the user */
    async function login(email, password) {
        setLoading(true)
        await axios.post('/login', {
            email: email,
            password: password
        }).then(data => console.log(data))
            .catch(err => setError(err.message))
            .finally(setLoading(false))
    }

    async function signup(username, email, password) {
        console.log("called!")
        setLoading(true);
        await axios.post('/register', {
            userName: username,
            email: email,
            password: password
        }).then(res => console.log(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }

    async function logout() {
        setLoading(true);
        window.localStorage.removeItem('accessToken')
        navigate('/auth/login')
    }


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