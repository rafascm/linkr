import Axios from 'axios';
import React, { useState, createContext } from 'react';

const PostsContext = createContext();

export default PostsContext;

export const PostsProvider = (props) => {
    const [postsList, setPostsList] = useState([]);
    const [clickedUser, setClickedUser] = useState({});
    const [clickedHashTag, setClickedHashtag] = useState('');
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);

    const headURL = 'https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr';
    const tailURL = 'posts?offset=0&limit=20';

    const userHasBeenClicked = Object.keys(clickedUser).length;

    const updatePostsList = (config) => {
        const url = (
            clickedHashTag ? 
                `${headURL}/hashtags/${clickedHashTag}/${tailURL}` : 
                userHasBeenClicked ?
                    `${headURL}/users/${clickedUser.id}/${tailURL}` :
                    `${headURL}/${tailURL}`
        );    
        
        setIsLoadingPosts(true);
    
        Axios.get(url, config)
            .catch(errorHandler)
            .then(({ data }) => processPosts(data));
    }

    const processPosts = (data) => {
        !data.posts.length && alert('Nenhum post encontrado');
        setPostsList([...data.posts]);
        setIsLoadingPosts(false);
    }

    const errorHandler = () => {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
    }
    
    return (
        <PostsContext.Provider
            value={{
                isLoadingPosts,
                setIsLoadingPosts,
                postsList,
                setPostsList,
                updatePostsList,
                clickedUser,
                setClickedUser,
                clickedHashTag,
                setClickedHashtag
            }}
        >
            {props.children}
        </PostsContext.Provider>
    );
}