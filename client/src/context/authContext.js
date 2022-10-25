import React, { createContext, useContext, useMemo, useState } from "react";


const AuthContext = createContext({
    user: null,
    login: null,
    signup: null,
    error: null,
    loading: null,
});


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    async function login({email,password}) {
        
    }

    const memoedValue = useMemo(() => ({
        user, login, signup, error, loading
    }), [])
    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}


export default function useAuth() {
    return useContext(AuthContext);
}