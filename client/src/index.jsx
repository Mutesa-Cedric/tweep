import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthProvider} from "./hooks/useAuth";
import {ThemeProvider} from "./hooks/useDarkMode";
ReactDOM.render(
    <AuthProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </AuthProvider>
    ,
    document.getElementById('root')
);