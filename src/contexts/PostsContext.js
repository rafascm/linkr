import Axios from 'axios';
import React, { useState, createContext, useContext } from 'react';

const PostsContext = createContext();

export default PostsContext;

export const PostsProvider = (props) => {
    const [postsList, setPostsList] = useState([]);    
    const [increaseOffset, setIncreaseOffset] = useState(0);

    const updatePostsList = (config) => {        
        
        Axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=5', config)
            .catch(errorHandler)
            .then(({ data }) => processPosts(data));
    }   

    const processPosts = (data) => {
        !data.posts.length && alert('Nenhum post encontrado');
        setPostsList([...data.posts]);        
    }

    const errorHandler = () => {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
    }

    console.log(postsList)
    
    return (
        <PostsContext.Provider
            value={{                
                postsList,
                setPostsList,
                updatePostsList,
                processPosts,
                errorHandler,
                increaseOffset,
                setIncreaseOffset
            }}
        >
            {props.children}
        </PostsContext.Provider>
    );
}