import React from "react";
import useDarkMode from "../hooks/useDarkMode";

const ThemeToggler = () => {
    const { theme, setTheme } = useDarkMode();
    return (
        <div className="transition duration-500 ease-in-out rounded-full p-2">
            {theme === 'dark' ? (
                <svg onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="MuiSvgIcon-root w-6 h-6 mr-4 cursor-pointer" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="white"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path><circle cx="12" cy="12" r="2"></circle></svg>
            ) : (
                <svg onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="MuiSvgIcon-root w-6 h-6 mr-4 cursor-pointer" fill="#828282" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12.29 7c-.74 0-1.45.17-2.08.46 1.72.79 2.92 2.53 2.92 4.54s-1.2 3.75-2.92 4.54c.63.29 1.34.46 2.08.46 2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
                </svg>
            )}
        </div>
    )
}

export default ThemeToggler;