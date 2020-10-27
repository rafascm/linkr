import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import PostsContext from '../contexts/PostsContext';
import Post from './Post.js';
import Axios from 'axios';

const PostsList = () => {
    const { postsList, setPostsList, updatePostsList } = useContext(PostsContext);

    console.log(postsList);

    const { User } = useContext(UserContext);
    const { token } = User;
    const [config] = useState({ headers: { 'user-token': token } });

    useEffect(() => updatePostsList(config), []);

    return (
        <>
            {postsList.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </>
    );
}

export default PostsList;