import React, { useEffect, useState } from "react";
import Categories from './Categories';
import Post from "../../components/Post";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import useData from '../../hooks/useData';
import axios from "../../../axios.config"

const Explore = () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const filter = urlParams.get('filter');

    const { posts } = useData();
    const [postsData, setPostsData] = useState(posts);

    // top posts
    async function getTopPosts() {
        if (postsData) {
            setPostsData(postsData.sort((a, b) => b.likes.length - a.likes.length));
        } else {
            await axios.get("/posts").then(({ data }) => {
                if (data.posts) {
                    setPostsData(data.posts.sort((a, b) => b.likes.length - a.likes.length));
                }
            }).catch(err => {
                console.log(err.code)
            })
        }
    }

    // latest posts

    async function getLatestPosts() {
        if (postsData) {
            setPostsData(postsData.sort((a, b) => b.postedAt - a.postedAt))
        } else {
            await axios.get("/posts").then(({ data }) => {
                if (data.posts) {
                    setPostsData(data.posts.sort((a, b) => b.postedAt - a.postedAt));
                }
            })
        }
    }

    async function getMostRetweetedPosts() {
        if (postsData) {
            setPostsData(postsData.sort((a, b) => b.retweeps.length - a.retweeps.length))
        } else {
            await axios.get("/posts").then(({ data }) => {
                if (data.posts) {
                    setPostsData(data.posts.sort((a, b) => b.retweeps.length - a.retweeps.length));
                }
            })
        }
    }

    async function getMostCommentedPosts() {
        if (postsData) {
            setPostsData(postsData.sort((a, b) => b.comments.length - a.comments.length))
        } else {
            await axios.get("/posts").then(({ data }) => {
                if (data.posts) {
                    setPostsData(data.posts.sort((a, b) => b.comments.length - a.comments.length));
                }
            })
        }
    }

    useEffect(() => {
        switch (filter) {
            case 'top': getTopPosts()
                break;
            case 'latest': getLatestPosts()
                break;
            case 'people': getMostRetweetedPosts();
                break;
            case 'media': getMostCommentedPosts();
                break;
            default:
        }
    }, [filter])

    return (
        <>
            <div className=" mt-20 flex justify-between xl:px-52 ">
                <div className=" h-auto flex   justify-between">
                    <Categories />
                </div>
                <div id="expContainer">
                    <div
                        className='relative  sm:mx-4 w-[650px]   mb-4 items-center flex'>
                        <div className="absolute ml-4 rounded-lg">
                            <SearchOutlinedIcon fontSize="small" style={{ fill: "#BDBDBD" }} />
                        </div>
                        <input type='text'
                            placeholder=' Find a Tweeper'
                            className={'bg-white w-full pl-12 py-3 rounded-md border-none focus:outline-none  shadow-sm placeholder:text-[#BDBDBD] dark:border-solid dark:bg-inherit dark:border dark:border-gray-600 dark:focus:border-gray-400  dark:text-white'}
                        />
                    </div>
                    <div className="mx-auto w-[745px] ">
                        {postsData && postsData.map(post => (
                            <Post key={post._id} {...post} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}

export default Explore;