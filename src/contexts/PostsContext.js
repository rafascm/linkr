import Axios from 'axios';
import React, { useState, createContext, useContext } from 'react';
import UserContext from './UserContext';

const PostsContext = createContext();

export default PostsContext;

export const PostsProvider = (props) => {
    const [postsList, setPostsList] = useState([]);

    const updatePostsList = (config) => {
        Axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=2', config)
            .catch(() => alert('erro'))
            .then(({ data }) => setPostsList([...data.posts]));
    }

    return (
        <PostsContext.Provider
            value={{
                postsList,
                setPostsList,
                updatePostsList
            }}
        >
            {props.children}
        </PostsContext.Provider>
    );
}