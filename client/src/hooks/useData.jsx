import React, { useState, useEffect, createContext, useContext, useMemo } from "react";
import axios from "../../axios.config"
const DataContext = createContext({
    posts: null,
    loadingPosts: null,
    getSavedPosts: (username) => [],
    getMostRetweepedPosts: () => [],
    getMostCommentedPosts: () => [],
    getLatestPosts: () => { },
    getTopPosts: () => [],
    getPostsByUsername: (username) => []
});

export function DataProvider({ children }) {
    const [loadingPosts, setLoadingPosts] = useState(null);
    const [posts, setPosts] = useState(null);

    const fetchPosts = async () => {
        await axios.get('/posts').then(({ data }) => {
            setPosts(data.posts)
        })
    }

    const getTopPosts = () => {
        setLoading(true);
        const posts = posts.sort((a, b) => b.likes.length - a.likes.length);
        setLoading(false);

    }

    const getSavedPosts = (username) => {
        setLoading(true);
        let savedPosts = [];

        posts.forEach(post => {
            if (post.saved.includes(username)) {
                savedPosts.push(post);
            }
        });
        setLoading(false);
        return savedPosts;
    }

    const getMostRetweepedPosts = () => {
        setLoading(true);
        let mostRetweepedPosts = posts.sort((a, b) => {
            return b.retweeps.length - a.retweeps.length
        });
        setLoading(false);
        return mostRetweepedPosts;
    }

    const getMostCommentedPosts = () => {
        setLoading(true);

        let mostCommentedPosts = posts.sort((a, b) => {
            return b.comments.length - a.comments.length
        });

        setLoading(false);
        return mostCommentedPosts;
    }

    const getLatestPosts = () => {
        return posts;
    }

    const getPostsByUsername = (username) => {
        setLoading(true);
        return posts.filter(post => post.postedBy === username);
    }

    useEffect(() => {
        setLoadingPosts(true)
        fetchPosts();
        setLoadingPosts(false);
    }, []);

    const memoedData = useMemo(() => ({
        posts, getSavedPosts, getMostRetweepedPosts, getMostCommentedPosts, loadingPosts, getTopPosts, getLatestPosts, getPostsByUsername
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