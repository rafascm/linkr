import Axios from 'axios';
import React, { useState, createContext } from 'react';

const PostsContext = createContext();

export default PostsContext;

export const PostsProvider = (props) => {
    const [postsList, setPostsList] = useState([]);
    const [clickedUser, setClickedUser] = useState({});
    const [clickedHashTag, setClickedHashtag] = useState('');    
    const [increaseOffset,setIncreaseOffset] = useState(0);
   
    const updatePostsList = (config) => {

        setIncreaseOffset(0);

        const tailURL = `posts?offset=0&limit=5`;
        const headURL = 'https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr';

        const userHasBeenClicked = Object.keys(clickedUser).length;

        const url = (
            clickedHashTag ? 
                `${headURL}/hashtags/${clickedHashTag}/${tailURL}` : 
                userHasBeenClicked ?
                    `${headURL}/users/${clickedUser.id}/${tailURL}` :
                    `${headURL}/${tailURL}`
        );
        
        Axios.get(url, config)
            .catch(errorHandler)
            .then(({ data }) => processPosts(data));
    } 
    
    console.log(postsList)

    const processPosts = (data) => {
        !data.posts.length && alert('Nenhum post encontrado');
        setPostsList([...data.posts]);        
    }

    const errorHandler = () => {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
    } 
    
    return (
        <PostsContext.Provider
            value={{                
                postsList,
                setPostsList,
                updatePostsList,
                processPosts,
                errorHandler,
                increaseOffset,
                setIncreaseOffset,
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