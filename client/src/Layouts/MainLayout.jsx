import { CircularProgress } from '@mui/material';
import React from 'react';
import useAuth from '../hooks/useAuth';
import useData from '../hooks/useData';
import Navbar from '../components/Navbar';


const MainLayout = ({ children }) => {
    const { user, loading, error } = useAuth();
    const { posts, dataError, loadingPosts } = useData();

    return (
        <div className={"bg-[#F2F2F2] dark:bg-[#252329] h-auto overflow-x-hidden min-h-screen"}>
            {
                loading || !user || loadingPosts || !posts ?
                    <div className={"w-full h-screen flex items-center justify-center dark:bg-[#252329]"}>
                        <CircularProgress />
                    </div> :
                    <>
                        <Navbar />
                        {children}
                    </>
            }
        </div>
    )
}


export default MainLayout;