import Navbar from '../../components/Navbar';
import React, { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Categories from './Categories';
import Post from "../../components/Post";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import useData from '../../hooks/useData';
import useAuth from '../../hooks/useAuth';

let Explore = (props) => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const filter = urlParams.get('filter');

    const { loading, posts, getMostCommentedPosts, getMostRetweepedPosts, getTopPosts, getLatestPosts } = useData()
    const { user } = useAuth();
    useEffect(() => {
        switch (filter) {
            case 'top':
                setPosts(getTopPosts());
                break;
            case 'latest':
                setPosts(getLatestPosts())
                break;
            case 'people':
                setPosts(getMostRetweepedPosts());
                break;
            case 'media':
                setPosts(getMostCommentedPosts());
                break;
            default:
        }
    }, [filter])

    !loading ?
        <div
            className={"bg-[#F2F2F2] h-screen overflow-x-hidden dark:bg-[#252329]"}>
            <Navbar toExplore={true} />
            <div className=" mt-20 flex justify-between xl:px-52 ">
                <div className=" h-auto flex   justify-between">
                    <Categories />
                </div>
                <div id="expContainer">
                    <div
                        className='relative  xl:w-auto sm:mx-4 w-[650px]   mb-4 items-center flex'>
                        <div className="absolute ml-4  rounded-lg">
                            <SearchOutlinedIcon fontSize="small" style={{ fill: "#BDBDBD" }} />
                        </div>
                        <input type='text'
                            placeholder='Search'
                            className={'bg-white pl-12 py-3 rounded-md border-none focus:outline-none  shadow-sm placeholder:text-[#BDBDBD] dark:bg-inherit dark:text-white'}
                        />
                    </div>
                    <div className="mx-auto w-[745px] ">
                        {posts.map(post =>
                            <Post key={post._id} {...post} />
                        )}
                    </div>
                </div>
            </div>
        </div>
        :
        <div
            className={"w-full h-screen flex items-center justify-center dark:bg-[#252329]"}>
            <CircularProgress />
        </div>
}

export default Explore