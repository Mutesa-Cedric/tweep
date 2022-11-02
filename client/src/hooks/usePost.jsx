import React, { useContext, useMemo, createContext, useState, useEffect } from 'react';
import axios from '../../axios.config'
// do all operations related to post
const PostContext = createContext({
    postComment: (commentedBy, postId, body) => { },
    handleRetweep: (username, postid) => { },
    handleSavePost: (username, postid) => { },
    handleLikePost: (username, postid) => { },
    postLoading: null
})

export const PostProvider = ({ children }) => {
    const [postLoading, setPostLoading] = useState(false);
    const [error, setError] = useState(null);

    // comment on a post
    async function postComment(commentedBy, postId, body) {
        setPostLoading(true);
        await axios.patch(`/posts/updateComments/${postId}`, {
            commentedBy: commentedBy,
            body: body,
            commentedAt: new Date().getTime(),
            likes: []
        }).then(data => {
            // console.log(data)
        }).catch(err => {
            // console.log(err)
            setError(err.message)
        })
    }

    // handle  post retweep
    async function handleRetweep(username, postId) {
        await axios.patch(`/posts/updateRetweeps/${postId}`, { retweep: username })
    }

    // handle save post
    async function handleSavePost(username, postId) {
        await axios.patch(`/posts/updateSaved/${postId}`, { save: username })
    }

    // handle like post
    async function handleLikePost(username, postId) {
        await axios.patch(`/posts/updateLikes/${postId}`, { like: username })
    }

    const memoedValues = useMemo(() => ({
        postComment, postLoading, handleRetweep, handleSavePost, handleLikePost
    }), [])

    return <PostContext.Provider value={memoedValues}>
        {children}
    </PostContext.Provider>
}

export default function usePost() {
    return useContext(PostContext);
}