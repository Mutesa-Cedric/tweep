import React, { useState, useEffect } from "react";
import SideSection from '../../components/SideSection';
import Post from '../../components/Post';
import { Link } from 'react-router-dom';
import useData from '../../hooks/useData';
import useAuth from '../../hooks/useAuth';

let Bookmarks = (props) => {
    const { getSavedPosts } = useData();
    const { user, loading } = useAuth();
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        if (user) {
            setSavedPosts(getSavedPosts(user.userName));
        }
    }, [user, loading])
    return (
        <>
            <div className=" mt-32 flex justify-between xl:px-52 ">
                <div className={'mr-24'}>
                    <SideSection fixLinks={props.fixSideSearch} />
                </div>
                <div className="w-[745px]">
                    {savedPosts.length === 0 ?
                        <div className={'w-full h-full border-2 bg-gray-100 flex items-center flex-col justify-center dark:shadow-md dark:bg-inherit'}>
                            <span className={'text-gray-500 text-lg capitalize'}>You have no saved Tweeps.</span>
                            <Link to={'/'}>
                                <button className={'bg-blue-400 hover:bg-blue-500 my-4 text-white px-4 py-1 rounded-sm'}>
                                    <span className={'capitalize '}>go save one</span>
                                </button>
                            </Link>
                        </div> :
                        savedPosts.map(post => {
                            return <Post key={post._id} {...post} />
                        })
                    }
                </div>
            </div>
        </>
    )

}

export default Bookmarks;