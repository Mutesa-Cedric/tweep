import React, { useState, useEffect, createContext, useContext, useMemo } from "react";
import axios from "../../axios.config"
const DataContext = createContext({
    posts: null,
    dataError: null,
    loadingPosts: null,
    getSavedPosts: (username) => [],
    getPostsByUsername: (username) => []
});

export function DataProvider({ children }) {
    const [loadingPosts, setLoadingPosts] = useState(null);
    const [posts, setPosts] = useState(null);
    const [dataError, setDataError] = useState(null);

    const fetchPosts = async () => {
        await axios.get('/posts').then(({ data }) => {
            setPosts(data.posts)
        }).catch(err => {
            setDataError(err.code)
        })
    }

    const getSavedPosts = (username) => {
        setLoadingPosts(true);
        let savedPosts = [];

        posts.forEach(post => {
            if (post.saved.includes(username)) {
                savedPosts.push(post);
            }
        });
        setLoadingPosts(false);
        return savedPosts;
    }


    const getPostsByUsername = (username) => {
        setLoadingPosts(true);
        let postsOfUser = [];
        postsOfUser = posts.filter(post => post.postedBy === username);
        setLoadingPosts(false);
        return postsOfUser;
    }

    useEffect(() => {
        setLoadingPosts(true)
        fetchPosts();
        setLoadingPosts(false);
    }, []);

    const memoedData = useMemo(() => ({
        posts, getSavedPosts, dataError, loadingPosts, getPostsByUsername
    }), [posts])

    return (
        <DataContext.Provider value={memoedData}>
            {children}
        </DataContext.Provider>
    )
}


export default function useData() {
    return useContext(DataContext);
}