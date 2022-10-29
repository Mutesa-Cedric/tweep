import React, { useContext, useMemo, createContext, useState, useEffect } from 'react';
import axios from '../../axios.config'
// do all operations related to post
const PostContext = createContext({
    postComment: (commentedBy, postId, body) => { },
    unRetweepPost: (postId) => { },
    postLoading: null
})

export const PostProvider = ({ children }) => {
    const [postLoading, setPostLoading] = useState(false);

    async function postComment(commentedBy, postId, body) {
        setPostLoading(true);
        await axios.patch(`/posts/updateComments/${postId}`, {
            commentedBy: commentedBy,
            body: body,
            commentedAt: new Date().getTime(),
            likes: []
        })
    }

    memoedValues = useMemo(() => ({
        postComment, postLoading
    }))

    return <PostContext.Provider value={memoedValues}>
        {children}
    </PostContext.Provider>
}

export default function usePost() {
    return useContext(PostContext);
}