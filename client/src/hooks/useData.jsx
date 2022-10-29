import React, { useState, useEffect, createContext, useContext, useMemo } from "react";
import axios from "../../axios.config"
const DataContext = createContext({
    posts: null,
    loading: null,
    loadingPosts: null,
    getSavedPosts: (username) => [],
    getMostRetweepedPosts: () => [],
    getMostCommentedPosts: () => [],
    getTopPosts: () => [],
});

export function DataProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [posts, setPosts] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        const data = await axios.get('/posts');
        setPosts(data.posts);
        setLoadingPosts(false);
        setLoading(false);
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

    useEffect(() => {
        fetchPosts();
    }, []);

    const memoedData = useMemo(() => ({
        posts, loading, getSavedPosts, getMostRetweepedPosts, getMostCommentedPosts, loadingPosts, getTopPosts
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