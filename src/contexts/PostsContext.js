import Axios from 'axios';
import React, { useState, createContext, useContext } from 'react';

const PostsContext = createContext();

export default PostsContext;

export const PostsProvider = (props) => {
    const [postsList, setPostsList] = useState([]);

    const updatePostsList = (config) => {
        Axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=2', config)
            .catch(errorHandler)
            .then(({ data }) => processPosts(data));
    }

    const processPosts = (data) => {
        !data.posts.length && alert('Nenhum post encontrado');
        setPostsList([...data.posts])
    }

    const errorHandler = () => {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
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