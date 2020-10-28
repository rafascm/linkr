import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import PostsContext from '../contexts/PostsContext';
import Post from './Post.js'; 

const PostsList = () => {
    const { isLoadingPosts, postsList, updatePostsList } = useContext(PostsContext);

    const { User } = useContext(UserContext);
    const { token } = User;
    const [config] = useState({ headers: { 'user-token': token } });

    useEffect(() => updatePostsList(config), []);

    return (
        <>  
            {isLoadingPosts 
                ? <Loading src="./media/loading.gif" /> 
                : (postsList.map(post => (<Post post={post} key={post.id} />)))            
            }
            
        </>
    );
}

export default PostsList;

const Loading = styled.img`
    width: 10rem;
    height: auto;
`;